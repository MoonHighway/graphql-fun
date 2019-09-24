const { RedisPubSub } = require("graphql-redis-subscriptions");
const Redis = require("ioredis");

global.players = [];
global.teams = [];
global.playersOnDeck = [];
global.availablePlayers = [];
global.currentGame = {
  playerCount: 0,
  players: [],
  playingMusic: [],
  faces: []
};

const pubsub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL)
});

export const createContext = async () => ({ req, connection }) => {
  const token = req
    ? req.headers.authorization
    : connection.context.authorization;

  console.log("token: ", token);
  console.log("admin secret: ", process.env.ADMIN_SECRET);

  const currentPlayer = token
    ? global.players.find(p => p.token === token.replace("Bearer ", "").trim())
    : null;

  const isAdmin =
    token &&
    token.replace("Bearer ", "").trim() === process.env.ADMIN_SECRET.trim();

  return {
    pubsub,
    currentPlayer,
    isAdmin,
    players: global.players,
    teams: global.teams,
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers,
    currentGame: global.currentGame
  };
};
