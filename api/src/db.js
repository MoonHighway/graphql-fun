import { authorizeWithGithub } from "./lib";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import faker from "faker";

export const db = new Redis(process.env.REDIS_URL);
export const pubsub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL)
});

export const createNewPoll = async (question, yesLabel, noLabel) => {
  await clearCurrentPoll();
  if (question || yesLabel || noLabel) {
    await db
      .pipeline()
      .set("poll:yes", 0)
      .set("poll:no", 0)
      .set("poll:meta", [question, yesLabel, noLabel].join(":|:"))
      .set("callout:name", "Audience Poll")
      .set("callout:state", "polling")
      .exec();
  } else {
    await db
      .pipeline()
      .set("poll:yes", 0)
      .set("poll:no", 0)
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

export const getPollResult = async () => {
  const result = (await db
    .pipeline()
    .get(`poll:yes`)
    .get(`poll:no`)
    .exec())
    .flat()
    .filter(v => v);
  if (!result.length) return { yes: null, no: null, polling: false };
  const [yes, no] = result.flat().filter(v => v);
  return { yes, no, polling: true };
};

export const removePollVote = async (vote = false) => {
  if (vote) await db.incr(`poll:yes`);
  else await db.incr(`poll:no`);
};

export const pollVote = async (vote = false) => {
  if (vote) await db.decr(`poll:yes`);
  else await db.decr(`poll:no`);
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

export const getCurrentPoll = async () => {
  let { yes, no, polling } = await getPollResult();
  if (polling) {
    const poll = await db.get(`poll:meta`);
    if (!poll) return { yes, no };
    const [question, yesLabel, noLabel] = poll.split(":|:");
    return { question, yesLabel, noLabel, yes, no };
  }

  return null;
};

export const getTeamByPlayer = async login => {
  const teams = await getAllTeams();
  return teams.find(team => team.players.map(p => p.login).includes(login));
};
export const getTeam = async color => {
  const team = await db.get(`team:${color}`);
  return team ? JSON.parse(team) : null;
};

export const endGame = async () => {
  await db.del(`currentGame`);
};

export const startGame = async () => {
  const game = {};
  let instruments = "BASS,DRUMS,PERCUSSION,SAMPLER,SYNTH".split(",");
  let onDeck = await getPlayersOnDeck();

  if (!onDeck) {
    throw new Error(`No players onDeck, pick players before starting a game`);
  }

  if (onDeck.length < 5) {
    throw new Error("WeJay requires at least 5 players");
  }

  game.players = onDeck.map((p, i) => ({
    ...p,
    instrument: instruments[i]
  }));

  clearAvailablePlayers();
  clearDeckPlayers();

  game.playerCount = onDeck.length;
  game.playingMusic = [];
  game.faces = [];

  await db.set(`currentGame`, JSON.stringify(game));
  return game;
};

export const getCurrentGame = async () => {
  let game = await db.get(`currentGame`);
  return game ? JSON.parse(game) : null;
};

export const saveGameState = async game => {
  if (game) {
    await db.set(`currentGame`, JSON.stringify(game));
  }
};

export const getPlayer = async token => {
  const player = await db.get(`player:${token}`);
  return player ? JSON.parse(player) : null;
};

export const pickRandomPlayer = async () => {
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

export const clearCallout = async () => await clearAllKeys(`callout:*`);
export const clearCurrentPoll = async () => {
  await clearAllKeys(`poll:*`);
  await clearCallout();
};
export const clearGame = () => db.del(`currentGame`);
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
