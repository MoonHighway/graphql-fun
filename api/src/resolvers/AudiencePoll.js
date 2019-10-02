import { createNewPoll, pollVote, getCurrentCallout } from "../db";

export const Mutation = {
  async startAudiencePoll(
    _,
    { question, yesLabel, noLabel },
    { pubsub, isAdmin }
  ) {
    if (!isAdmin) {
      throw new Error("Only Eve can start a new poll");
    }
    const results = await createNewPoll(question, yesLabel, noLabel);
    pubsub.publish("new-instructions");
    pubsub.publish("callout", {
      callout: await getCurrentCallout()
    });
    return results;
  },
  async vote(_, { tally }, { currentPlayer, pubsub }) {
    if (!currentPlayer) throw new Error("you must be logged in to vote");
    await pollVote(currentPlayer.login, tally);
    pubsub.publish("callout", {
      callout: await getCurrentCallout()
    });
    return true;
  }
};
