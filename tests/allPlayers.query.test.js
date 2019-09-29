import { createTestPlayers, queryPlayers, clearAllKeys } from "./helpers";

describe("creating and querying 10 players", () => {
  let players, result;

  beforeAll(async () => {
    await clearAllKeys();
    players = await createTestPlayers(10);
    result = await queryPlayers();
  });

  it("creates 10 players", () => {
    expect(players.length).toEqual(10);
  });

  it("displays correct playerCount", () => {
    expect(result.playerCount).toEqual(10);
  });

  it("contains the correct 10 players", () => {
    const resultLogins = result.allPlayers.map(p => p.login);
    const playerLogins = players.map(p => p.githubAuthorization.player.login);
    resultLogins.sort();
    playerLogins.sort();
    expect(resultLogins).toEqual(playerLogins);
  });
});
