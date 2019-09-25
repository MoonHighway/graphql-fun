import { getTeamByPlayer } from "../db";

export const Player = {
  team: player => getTeamByPlayer(player.login),
  instrument: (root, args, { currentGame }) => {
    const musician =
      currentGame.players &&
      currentGame.players.find(p => p.login === root.login);
    return musician ? musician.instrument : null;
  },
  playingGame: (root, args, { currentGame }) =>
    currentGame.playerCount ? true : false,
  endEvent: () => global.players.length === 0
};
