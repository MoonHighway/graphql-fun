import { pickRandomPlayer, putBackPlayer } from "../db";

export const Mutation = {
  async pickPlayer(root, args, { isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Eve can pick a player");
    }
    return await pickRandomPlayer();
  },
  async putBackPlayer(root, { login }, { isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Eve can put a player back");
    }
    return await putBackPlayer(login);
  }
};
