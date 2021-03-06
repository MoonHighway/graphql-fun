import { authorizeWithGithub } from "./lib";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import faker from "faker";

export const db = new Redis(process.env.REDIS_URL);
export const pubsub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL)
});

export const isOver = async () => (await getAllPlayers()).length === 0;

export const createNewGame = async (title, state = "waiting") => {
  await clearGame();
  await db
    .pipeline()
    .del(`game:*`)
    .set(`game:name`, title)
    .set(`game:state`, state)
    .exec();
  console.log(`new game created: `, title);
  return await getCurrentGame();
};

export const changeGameState = async nextState => {
  await db.set("game:state", nextState);
  return await getCurrentGame();
};

export const getCurrentGame = async () => {
  const game = (await db
    .pipeline()
    .get("game:name")
    .get("game:state")
    .exec())
    .flat()
    .filter(v => v);
  if (!game.length) return null;
  const [name, state] = game;
  if (name === "Fightjay")
    return { name, state, results: await getFightResult() };
  return { name, state };
};

export const getCurrentCallout = async () => {
  const callout = (await db
    .pipeline()
    .get("callout:name")
    .get("callout:state")
    .exec())
    .flat()
    .filter(v => v);
  if (!callout.length) return null;
  const [name, state] = callout;
  if (name === "Audience Poll")
    return { name, state, results: await getCurrentPoll() };
  return { name, state };
};

export const createNewPoll = async (question, yesLabel, noLabel) => {
  await clearCurrentPoll();
  if (question || yesLabel || noLabel) {
    await db
      .pipeline()
      .set("poll:meta", [question, yesLabel, noLabel].join(":|:"))
      .set("callout:name", "Audience Poll")
      .set("callout:state", "polling")
      .exec();
  } else {
    await db
      .pipeline()
      .set("callout:name", "Audience Poll")
      .set("callout:state", "polling")
      .exec();
  }

  console.log(`new poll created: ${question}`);

  return {
    question,
    yesLabel,
    noLabel,
    yes: 0,
    no: 0
  };
};

export const startCallout = async (name, state) =>
  await db
    .pipeline()
    .set(`callout:name`, name)
    .set(`callout:state`, state)
    .exec();

export const createNewSpotlight = async () => {
  await clearCallout();
  const name = "Spotlight";
  const state = "showing";
  await startCallout(name, state);
  return { name, state };
};

export const createNewFaces = async () => {
  await clearCallout();
  const name = "Faces";
  const state = "showing";
  await startCallout(name, state);
  return { name, state };
};

export const getFightResult = async () => {
  const votes = {
    node: (await db.keys(`fight:NODE:*`)).length,
    react: (await db.keys(`fight:REACT:*`)).length,
    graphql: (await db.keys(`fight:GRAPHQL:*`)).length,
    typescript: (await db.keys(`fight:TYPESCRIPT:*`)).length
  };

  let leader = "GRAPHQL";
  let total = votes.node + votes.react + votes.graphql + votes.typescript;

  if (total > 0)
    leader = Object.keys(votes)
      .reduce((winner, next) => (votes[winner] > votes[next] ? winner : next))
      .toUpperCase();

  return { leader, ...votes };
};

export const fightVote = async (login, choice) => {
  const keys = await db.keys(`fight:*:${login}`);
  const pipeline = db.pipeline();
  keys.forEach(key => pipeline.del(key));
  await pipeline.exec();
  if (choice) await db.set(`fight:${choice}:${login}`, 1);
};

export const getPollResult = async () => ({
  yes: (await db.keys(`poll:yes:*`)).length,
  no: (await db.keys(`poll:no:*`)).length
});

export const pollVote = async (login, tally = false) => {
  const keys = await db.keys(`poll:*:${login}`);
  const pipeline = db.pipeline();
  keys.forEach(key => pipeline.del(key));
  await pipeline.exec();
  if (tally) await db.set(`poll:yes:${login}`, 1);
  else await db.set(`poll:no:${login}`, 1);
};

export const getCurrentPoll = async () => {
  let { yes, no } = await getPollResult();
  const poll = await db.get(`poll:meta`);
  if (!poll) return { yes, no };
  const [question, yesLabel, noLabel] = poll.split(":|:");
  return { question, yesLabel, noLabel, yes, no };
};

export const getTeamByPlayer = async login => {
  const teams = await getAllTeams();
  return teams.find(team => team.players.map(p => p.login).includes(login));
};
export const getTeam = async color => {
  const team = await db.get(`team:${color}`);
  return team ? JSON.parse(team) : null;
};

export const getPlayer = async token => {
  const player = await db.get(`player:${token}`);
  return player ? JSON.parse(player) : null;
};

export const pickRandomPlayer = async () => {
  let game = await getCurrentGame();

  if (!game) {
    throw new Error("You must start a game before picking players");
  }

  if (!game.name.trim().match(/Perf is Right|Perf is Right - FINAL|Wejay/)) {
    throw new Error(`You cannot pick players for ${game.name}`);
  }

  let available = await db.get("availablePlayers");
  let onDeck = await db.get("playersOnDeck");

  if (!available) {
    available = await getAllPlayers();
  } else {
    available = JSON.parse(available);
  }

  if (!onDeck) {
    onDeck = [];
  } else {
    onDeck = JSON.parse(onDeck);
  }

  if (onDeck.length >= game.maxPlayers) {
    throw new Error(
      `${game.name} allows ${game.maxPlayers} players, you already have ${onDeck.length} players`
    );
  }

  let randomId = Math.floor(Math.random() * available.length);
  let [player] = available.splice(randomId, 1);
  onDeck.push(player);
  const pipe = db.pipeline();
  pipe
    .set("availablePlayers", JSON.stringify(available))
    .set("playersOnDeck", JSON.stringify(onDeck))
    .exec();
  return { count: onDeck.length, player };
};

export const guess = async (login, guess) => {
  let onDeck = await db.get("playersOnDeck");
  if (onDeck) {
    onDeck = JSON.parse(onDeck);
    onDeck = onDeck.map(p => (p.login !== login ? p : { ...p, guess }));
    await db.set("playersOnDeck", JSON.stringify(onDeck));
    return true;
  }
  return false;
};

export const addMutationDuration = async (duration, login) => {
  let onDeck = await getPlayersOnDeck();
  if (!onDeck) return null;
  onDeck = onDeck.map(p => (p.login === login ? { ...p, duration } : p));
  await db.set("playersOnDeck", JSON.stringify(onDeck));
  return onDeck;
};

export const pickWinner = async () => {
  let onDeck = await getPlayersOnDeck();
  if (!onDeck.length) return null;
  const totals = onDeck.map(p => p.duration);
  const sum = totals.reduce((a, b) => a + b);
  const answer = Math.round(sum / totals.length);
  let player = onDeck.reduce((winner, player) => {
    const wGuess = winner ? winner.guess : 0;
    const pGuess = player ? player.guess : 0;
    if (wGuess > answer && pGuess > answer) return null;
    if (wGuess > pGuess && wGuess < answer) return winner;
    if (wGuess < pGuess && pGuess < answer) return player;
    return winner;
  });

  const winner = { player, answer };
  console.log(winner);
  await db.set("winner", JSON.stringify(winner));
  return winner;
};

export const getWinner = async () => {
  const winner = await db.get("winner");
  if (!winner) return null;
  return JSON.parse(winner);
};

export const putBackPlayer = async login => {
  let onDeck = await db.get("playersOnDeck");
  let player;
  if (login && onDeck) {
    onDeck = JSON.parse(onDeck);
    player = onDeck.find(p => p.login !== login);
    onDeck = onDeck.filter(p => p.login !== login);
    db.set("playersOnDeck", JSON.stringify(onDeck));
  } else if (onDeck) {
    onDeck = JSON.parse(onDeck);
    player = onDeck.pop();
    db.set("playersOnDeck", JSON.stringify(onDeck));
  }
  return { count: onDeck.length, player };
};

export const countDeck = async () => {
  const deck = await db.get("playersOnDeck");
  if (deck) {
    return JSON.parse(deck).length;
  } else {
    return 0;
  }
};

export const getPlayersOnDeck = async () => {
  const deck = await db.get("playersOnDeck");
  if (deck) {
    return JSON.parse(deck);
  } else {
    return [];
  }
};

export const countPlayers = async () => {
  const keys = await db.keys(`player:*`);
  return keys.length;
};

export const getAllTeams = async () => {
  const keys = await db.keys("team:*");
  const pipe = db.pipeline();
  keys.forEach(key => pipe.get(key));
  const teams = await pipe.exec();
  return teams
    .flat(2)
    .filter(val => val)
    .map(JSON.parse);
};

export const getAllPlayers = async () => {
  const keys = await db.keys("player:*");
  const pipe = db.pipeline();
  keys.forEach(key => pipe.get(key));
  const players = await pipe.exec();
  return players
    .flat(2)
    .filter(val => val)
    .map(JSON.parse);
};

export const removePlayer = token => clearKey(`player:${token}`);
export const clearKey = async key => {
  await db.del(key);
  console.log(`removing key: ${key}`);
};

export const hasPlayers = async () => {
  const keys = await db.keys("player:*");
  return keys !== null;
};

export const clearGame = async () => {
  await clearAllKeys(`fight:*`);
  await db.del(`winner`);
  await clearAllKeys(`game:*`);
  await clearDeckPlayers();
  await clearAvailablePlayers();
};
export const clearCallout = async () => await clearAllKeys(`callout:*`);
export const clearCurrentPoll = async () => {
  await clearAllKeys(`poll:*`);
  await clearCallout();
};
export const clearAvailablePlayers = () => db.del(`availablePlayers`);
export const clearDeckPlayers = () => db.del(`playersOnDeck`);
export const clearAllTeams = () => clearAllKeys(`team:*`);
export const clearAllPlayers = () => clearAllKeys(`player:*`);
export const clearAllKeys = async search => {
  const keys = await db.keys(search || "*");
  const pipeline = db.pipeline();
  console.log(`removing keys: ${keys.join("\n  ")}\n==========\n`);
  keys.forEach(key => pipeline.del(key));
  pipeline.exec();
};

export const createTeam = (name, players) => {
  const team = { color: { name }, players };
  db.set(`team:${name}`, JSON.stringify(team));
  console.log(`created team "${name}" with ${players.length} players`);
  return team;
};

export const createPlayer = async code => {
  const {
    message,
    access_token,
    avatar_url,
    login,
    name,
    email,
    location
  } = await authorizeWithGithub({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  });

  if (message) {
    throw new Error(`Github Authorization Error: ${message}`);
  }

  const player = {
    login,
    name,
    email,
    hometown: location,
    token: access_token,
    avatar: avatar_url
  };

  db.set(`player:${player.token}`, JSON.stringify(player));

  return { player, token: access_token };
};

export const createTestPlayer = () => {
  const player = {
    login: faker.internet.userName(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    hometown: faker.address.city() + ", " + faker.address.stateAbbr(),
    token: faker.random.uuid(),
    avatar: faker.internet.avatar()
  };

  db.set(`player:${player.token}`, JSON.stringify(player));

  console.log(`added player: ${player.login} <${player.token}>`);

  return { player, token: player.token };
};
