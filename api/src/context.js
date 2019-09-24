import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

global.teams = [];
global.playersOnDeck = [];
global.availablePlayers = [];
global.currentGame = {
  playerCount: 0,
  players: [],
  playingMusic: [],
  faces: []
};

const db = new Redis(process.env.REDIS_URL);
// db.keys("*").then(function(keys) {
//   // Use pipeline instead of sending
//   // one command each time to improve the
//   // performance.
//   var pipeline = db.pipeline();
//   keys.forEach(function(key) {
//     pipeline.del(key);
//   });
//   return pipeline.exec();
// });
const pubsub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL)
});

export const createContext = () => async ({ req, connection }) => {
  let currentPlayer = null,
    token = req ? req.headers.authorization : connection.context.authorization;

  if (token) {
    token = token.replace("Bearer ", "").trim();
    currentPlayer = await db.get(token);
    if (currentPlayer) {
      currentPlayer = JSON.parse(currentPlayer);
    }
  }

  let players = await db.get("players");
  players = players ? JSON.parse(players) : [];

  const isAdmin =
    token &&
    token.replace("Bearer ", "").trim() === process.env.ADMIN_SECRET.trim();

  return {
    db,
    pubsub,
    currentPlayer,
    isAdmin,
    players,
    teams: global.teams,
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers,
    currentGame: global.currentGame
  };
};
