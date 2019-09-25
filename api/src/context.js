import { pubsub, getPlayer } from "./db";

global.playersOnDeck = [];
global.availablePlayers = [];
global.currentGame = {
  playerCount: 0,
  players: [],
  playingMusic: [],
  faces: []
};

export const createContext = () => async ({ req, connection }) => {
  const token = req
    ? req.headers.authorization
    : connection.context.authorization;

  const currentPlayer = token
    ? await getPlayer(token.replace("Bearer ", "").trim())
    : null;

  const isAdmin =
    token &&
    token.replace("Bearer ", "").trim() === process.env.ADMIN_SECRET.trim();

  return {
    pubsub,
    currentPlayer,
    isAdmin,
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers,
    currentGame: global.currentGame
  };
};
