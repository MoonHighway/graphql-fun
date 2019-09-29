import { getTeamByPlayer, getCurrentGame, hasPlayers } from "../db";

export const Player = {
  team: player => getTeamByPlayer(player.login),
  instrument: async ({ login }, args) => {
    const game = await getCurrentGame();
    if (!game) return null;
    const musician = game.players && game.players.find(p => p.login === login);
    if (!musician) return null;
    return musician.instrument;
  },
  playingGame: async (root, args, { currentGame }) => {
    const game = await getCurrentGame();
    return game && game.players && game.players.length ? true : false;
  },
  endEvent: async () => !(await hasPlayers())
};
