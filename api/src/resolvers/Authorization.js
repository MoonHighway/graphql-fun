import { authorizeWithGithub } from "../lib";
import faker from "faker";

export const Query = {
  me: (_, args, { currentPlayer }) => currentPlayer,
  githubAuthorizationUrl: () =>
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
};

export const Mutation = {
  async githubAuthorization(_, { code }, { db }) {
    const players = await db.get("players");

    //if (code.trim() === "TEST_PLAYER") {
    const player = {
      login: faker.internet.userName(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      token: faker.random.uuid(),
      avatar: faker.internet.avatar()
    };

    console.log();

    if (players) {
      console.log("players");
      console.log(players);
      return { player, token: player.token };
    }

    //const playerIndex = players.map(p => p.login).indexOf(player.login);

    // if (playerIndex !== -1) players[playerIndex] = player;
    //else players.push(player);

    await players.set("players", [player]);

    //return { player, token: player.token };
    //}

    // const {
    //   message,
    //   access_token,
    //   avatar_url,
    //   login,
    //   name,
    //   email
    // } = await authorizeWithGithub({
    //   client_id: process.env.GITHUB_CLIENT_ID,
    //   client_secret: process.env.GITHUB_CLIENT_SECRET,
    //   code
    // });

    // if (message) {
    //   throw new Error(`Github Authorization Error: ${message}`);
    // }

    // var player = {
    //   login,
    //   name,
    //   email,
    //   token: access_token,
    //   avatar: avatar_url
    // };

    // var playerIndex = players.map(p => p.login).indexOf(player.login);

    // if (playerIndex !== -1) players[playerIndex] = player;
    // else players.push(player);

    // return { player, token: access_token };
  },

  logout(_, args, { players, currentPlayer }) {
    if (currentPlayer) {
      let pIndex = players.map(p => p.login).indexOf(currentPlayer.login);
      players.splice(pIndex, 1);
    }
  }
};
