import { PubSub } from "apollo-server-express";

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

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(1500);

export const createContext = async () => ({ req, connection }) => {
  const token = req
    ? req.headers.authorization
    : connection.context.authorization;

  const currentPlayer = token
    ? global.players.find(p => p.token === token.replace("Bearer ", "").trim())
    : null;

  const isAdmin = connection
    ? connection.context.Authorization === process.env.ADMIN_SECRET
    : req.headers.authorization === process.env.ADMIN_SECRET;

  return {
    pubsub,
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
