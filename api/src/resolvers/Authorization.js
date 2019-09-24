import { authorizeWithGithub } from "../lib";
import faker from "faker";

export const Query = {
  me: (_, args, { currentPlayer }) => currentPlayer,
  githubAuthorizationUrl: () =>
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
};

export const Mutation = {
  async githubAuthorization(_, { code }, { db, players }) {
    if (code.trim() === "TEST_PLAYER") {
      const player = {
        login: faker.internet.userName(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        token: faker.random.uuid(),
        avatar: faker.internet.avatar()
      };

      db.set(player.token, JSON.stringify(player));
      const playerIndex = players.indexOf(player.token);

      if (playerIndex !== -1) players[playerIndex] = player;
      else {
        players.push(player.token);
        db.set("players", JSON.stringify(players));
      }

      return { player, token: player.token };
    }

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

    db.set(player.token, JSON.stringify(player));
    const playerIndex = players.indexOf(player.token);

    if (playerIndex !== -1) players[playerIndex] = player;
    else {
      players.push(player.token);
      db.set("players", JSON.stringify(players));
    }

    return { player, token: access_token };
  },

  logout(_, args, { db, players, currentPlayer }) {
    if (currentPlayer) {
      db.del(currentPlayer.token);
      let pIndex = players.indexOf(currentPlayer.token);
      players.splice(pIndex, 1);
      db.set("players", JSON.stringify(players));
    }
  }
};
