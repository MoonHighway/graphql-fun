import {
  clearAllKeys,
  createTestPlayers,
  startAudiencePoll,
  getCurrentCallout,
  endCallout,
  subscribePlayerInstructions,
  subscribeBoardGame
} from "./helpers";

describe("audience polling", () => {
  let players, poll, playerSubscriptions, boardSubscription;

  beforeAll(async () => {
    await clearAllKeys();
    players = await createTestPlayers(10);
    // playerSubscriptions = await Promise.all(
    //   players.map(p => subscribePlayerInstructions(p.githubAuthorization.token))
    // );
    // boardSubscription = await subscribeBoardGame();
  });

  // Subscribe each player to instructions

  // Subscribe the Board to games

  describe("starting the poll", () => {
    beforeAll(async () => {
      poll = await startAudiencePoll("how to test", "integration", "unit");
    });

    it("correct question", () => {
      expect(poll.startAudiencePoll.question).toEqual("how to test");
    });

    it("correct yes label", () => {
      expect(poll.startAudiencePoll.yesLabel).toEqual("integration");
    });

    it("correct no label", () => {
      expect(poll.startAudiencePoll.noLabel).toEqual("unit");
    });

    it("correct yes results", () => {
      expect(poll.startAudiencePoll.yes).toEqual(0);
    });

    it("correct no results", () => {
      expect(poll.startAudiencePoll.no).toEqual(0);
    });
  });

  describe("querying the current callout - audience poll", () => {
    let data;
    beforeAll(async () => {
      data = await getCurrentCallout();
    });

    it("correct name", () => {
      expect(data.callout.name).toEqual("Audience Poll");
    });

    it("correct status", () => {
      expect(data.callout.state).toEqual("polling");
    });

    it("correct results", () => {
      expect(data.callout.results.yes).toEqual(0);
      expect(data.callout.results.no).toEqual(0);
    });
  });
  // Verify: Player subscriptions should have received data

  // Vote 3 players yes

  // Verify: Board heard votes

  // Verify: query poll results

  // Vote 7 players no

  // Verify: Board heard votes

  describe("ending the current callout", () => {
    let data, result;
    beforeAll(async () => {
      result = await endCallout();
      data = await getCurrentCallout();
    });

    it("endCallout returns true", () => {
      expect(result.endCallout).toEqual(true);
    });

    it("callout query should be null", () => {
      expect(data.callout).toEqual(null);
    });
  });

  // Verify: Board hears end

  // Verify: Player Screen hears end

  // Cleanup: Board Subscriptions

  // Cleanup: Player Subscriptions
});
