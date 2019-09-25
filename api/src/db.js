import { authorizeWithGithub } from "./lib";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import faker from "faker";

export const db = new Redis(process.env.REDIS_URL);
export const pubsub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL)
});

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
    email
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
    token: faker.random.uuid(),
    avatar: faker.internet.avatar()
  };

  db.set(`player:${player.token}`, JSON.stringify(player));

  console.log(`added player: ${player.login} <${player.token}>`);

  return { player, token: player.token };
};
