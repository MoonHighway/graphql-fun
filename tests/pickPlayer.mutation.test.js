import {
  createTestPlayers,
  clearAllKeys,
  pickPlayer,
  queryOnDeck,
  putPlayerBack
} from "./helpers";

describe("Picking Players Flow", () => {
  let players,
    player,
    deck,
    picks = [];

  beforeAll(async () => {
    await clearAllKeys();
    players = await createTestPlayers(5);
  });

  it("can pick a player (count)", async () => {
    picks.push(await pickPlayer());
    [player] = picks;
    expect(player.pickPlayer.count).toEqual(1);
  });

  it("can pick a player (login)", () => {
    expect(
      players
        .map(p => p.githubAuthorization.player.login)
        .includes(player.pickPlayer.player.login)
    ).toEqual(true);
  });

  it("has correct player on deck", async () => {
    deck = await queryOnDeck();
    const [firstPlayer] = deck.allPlayers;
    expect(deck.playerCount).toEqual(1);
    expect(firstPlayer.login).toEqual(player.pickPlayer.player.login);
  });

  it("pick 3 more players", async () => {
    for (let i = 0; i < 3; i++) {
      picks = [...picks, await pickPlayer()];
    }
    expect(picks.length).toEqual(4);
  });

  it("first - has correct players on deck", async () => {
    deck = await queryOnDeck();
    expect(deck.playerCount).toEqual(4);
    const logins = deck.allPlayers.map(p => p.login);
    const expectedLogins = picks.map(p => p.pickPlayer.player.login);
    expect(logins).toEqual(expectedLogins);
  });

  it("can put the last player back", async () => {
    const data = await putPlayerBack();
    picks.pop();
    expect(data.putBackPlayer.count).toEqual(3);
  });

  it("second - has correct players on deck", async () => {
    deck = await queryOnDeck();
    expect(deck.playerCount).toEqual(3);
    const logins = deck.allPlayers.map(p => p.login);
    const expectedLogins = picks.map(p => p.pickPlayer.player.login);
    expect(logins).toEqual(expectedLogins);
  });

  it("can put the last player back", async () => {
    const { login } = player.pickPlayer.player;
    await putPlayerBack(login);
    picks = picks.filter(p => p.pickPlayer.player.login !== login);
  });

  it("third - has correct players on deck", async () => {
    deck = await queryOnDeck();
    expect(deck.playerCount).toEqual(2);
    const logins = deck.allPlayers.map(p => p.login);
    const expectedLogins = picks.map(p => p.pickPlayer.player.login);
    expect(logins).toEqual(expectedLogins);
  });
});
