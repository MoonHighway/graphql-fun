import { random } from "html-colors";
import { breakIntoGroups } from "../lib";
import ColorManager from "color";

export const Query = {
  allTeams: () => global.teams,
  Team: (root, { color }) =>
    global.teams.find(team =>
      team.players.map(p => p.color.name === color.name)
    )
};

export const Mutation = {
  createTeams: (root, { count = 2 }, { pubsub, currentPlayer }) => {
    let groups = breakIntoGroups(count, global.players);
    global.teams = [...Array(count)].map((_, i) => ({
      color: {
        name: random()
      },
      players: groups[i]
    }));
    pubsub.publish("new-instructions");
    return global.teams;
  },
  destroyTeams: (_, args, { pubsub, currentPlayer, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can destroy the teams");
    }

    global.teams = [];
    pubsub.publish("new-instructions");
    return true;
  }
};

export const Color = {
  name: ({ name }) => name,
  hex: ({ name }) => ColorManager(name).hex(),
  rgb: ({ name }) =>
    ColorManager(name)
      .rgb()
      .negate()
      .string(),
  negate: ({ name }) =>
    ColorManager(name)
      .rgb()
      .negate()
      .string(),
  text: ({ name }) =>
    ColorManager(name).luminosity() > 0.7
      ? ColorManager(name)
          .darken(0.8)
          .string()
      : ColorManager(name)
          .lighten(0.8)
          .string()
};
