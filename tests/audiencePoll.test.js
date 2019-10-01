import {
  clearAllKeys,
  createTestPlayers,
  startAudiencePoll,
  getCurrentCallout,
  vote,
  endCallout,
  subscribePlayerInstructions,
  subscribeBoardGame
} from "./helpers";
import { addTypenameToDocument } from "apollo-utilities";

describe("audience polling", () => {
  let players, tokens, poll, playerSubscriptions, boardSubscription;

  beforeAll(async () => {
    await clearAllKeys();
    players = await createTestPlayers(10);
    tokens = players.map(p => p.githubAuthorization.token);
    const mock = jest.fn();
    boardSubscription = [mock, await subscribeBoardGame(mock)];
    // playerSubscriptions = await Promise.all(
    //   players.map(p => subscribePlayerInstructions(p.githubAuthorization.token))
    // );
    // boardSubscription = await subscribeBoardGame();
  });

  afterAll(async () => {
    let [, unsubscribe] = boardSubscription;
    await unsubscribe();
  });

  // Subscribe each player to instructions

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

  describe("board subscription receives start", () => {
    let fn, results;

    beforeAll(() => {
      [fn] = boardSubscription;
      [results] = fn.mock.calls[0];
    });

    it("called", () => {
      expect(fn.mock.calls.length).toEqual(1);
    });

    it("called with correct callout name", () => {
      expect(results.data.callout.name).toEqual("Audience Poll");
    });

    it("called with correct callout state", () => {
      expect(results.data.callout.state).toEqual("polling");
    });

    it("called with correct results question", () => {
      expect(results.data.callout.results.question).toEqual("how to test");
    });

    it("called with correct results yesLabel", () => {
      expect(results.data.callout.results.yesLabel).toEqual("integration");
    });

    it("called with correct results noLabel", () => {
      expect(results.data.callout.results.noLabel).toEqual("unit");
    });

    it("called with initial yes value", () => {
      expect(results.data.callout.results.yes).toEqual(0);
    });

    it("called with initial yes value", () => {
      expect(results.data.callout.results.no).toEqual(0);
    });
  });

  // Verify: Player subscriptions should have received data

  it("first three players vote yes", async () => {
    for (let i = 0; i < 3; i++) {
      await vote(tokens[i], true);
    }
  });

  describe("board heard 3 yes votes", () => {
    let fn;

    beforeAll(() => {
      [fn] = boardSubscription;
    });

    it("subscription fired 4 times", done => {
      setTimeout(() => {
        expect(fn.mock.calls.length).toEqual(4);
        done();
      }, global.waitTime);
    });

    it("has 3 yes votes", done => {
      setTimeout(() => {
        const results = fn.mock.calls[fn.mock.calls.length - 1][0];
        expect(results.data.callout.results.yes).toEqual(3);
        expect(results.data.callout.results.no).toEqual(0);
        done();
      }, global.waitTime + 1);
    });
  });

  describe("verifying the 3 yes votes", () => {
    let data;
    beforeAll(async () => {
      data = await getCurrentCallout();
    });

    it("correct results", () => {
      expect(data.callout.results.yes).toEqual(3);
      expect(data.callout.results.no).toEqual(0);
    });
  });

  it("last seven players vote no", async () => {
    for (let i = 3; i < 10; i++) {
      await vote(tokens[i], false);
    }
  });

  describe("verifying the 7 no votes", () => {
    let data;
    beforeAll(async () => {
      data = await getCurrentCallout();
    });

    it("correct results", () => {
      expect(data.callout.results.yes).toEqual(3);
      expect(data.callout.results.no).toEqual(7);
    });
  });

  describe("board heard 7 no votes", () => {
    let fn;

    beforeAll(() => {
      [fn] = boardSubscription;
    });

    it("subscription fired 11 times", done => {
      setTimeout(() => {
        expect(fn.mock.calls.length).toEqual(11);
        done();
      }, global.waitTime * 2);
    });

    it("has 7 no votes", done => {
      setTimeout(() => {
        const results = fn.mock.calls[fn.mock.calls.length - 1][0];
        expect(results.data.callout.results.yes).toEqual(3);
        expect(results.data.callout.results.no).toEqual(7);
        done();
      }, global.waitTime * 2 + 1);
    });
  });

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

  describe("board hears end callout", () => {
    let fn;

    beforeAll(() => {
      [fn] = boardSubscription;
    });

    it("subscription fired 4 times", done => {
      setTimeout(() => {
        expect(fn.mock.calls.length).toEqual(12);
        done();
      }, global.waitTime * 3);
    });

    it("callout is null", done => {
      setTimeout(() => {
        const results = fn.mock.calls[fn.mock.calls.length - 1][0];
        expect(results.data.callout).toEqual(null);
        done();
      }, global.waitTime * 3 + 1);
    });
  });

  // Verify: Player Screen hears end

  // Cleanup: Player Subscriptions
});
