import {
  clearAllKeys,
  createTestPlayers,
  subscribePlayerInstructions,
  subscribeBoardGame
} from "./helpers";

describe("audience polling", () => {
  let players, playerSubscriptions, boardSubscription;

  beforeAll(async () => {
    await clearAllKeys();
    players = await createTestPlayers(10);
    // playerSubscriptions = await Promise.all(
    //   players.map(p => subscribePlayerInstructions(p.githubAuthorization.token))
    // );
    // boardSubscription = await subscribeBoardGame();
  });

  test.todo("complete this test");

  // Subscribe each player to instructions

  // Subscribe the Board to games

  // Start Game -> Audience Poll

  // Verify: Player subscriptions should have received data

  // Vote 3 players yes

  // Verify: Board heard votes

  // Verify: query poll results

  // Vote 7 players no

  // Verify: Board heard votes

  // Verify: query poll results

  // End Audience Poll

  // Verify: Board hears end

  // Verify: Player Screen hears end

  // Cleanup: Board Subscriptions

  // Cleanup: Player Subscriptions
});

//   it("creates 10 players", () => {
//     expect(players.length).toEqual(10);
//   });

//   it("displays correct playerCount", () => {
//     expect(result.playerCount).toEqual(10);
//   });

//   it("contains the correct 10 players", () => {
//     const resultLogins = result.allPlayers.map(p => p.login);
//     const playerLogins = players.map(p => p.githubAuthorization.player.login);
//     resultLogins.sort();
//     playerLogins.sort();
//     expect(resultLogins).toEqual(playerLogins);
//   });
