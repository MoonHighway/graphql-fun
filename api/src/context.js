import { pubsub, getPlayer } from "./db";

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
    isAdmin
  };
};
