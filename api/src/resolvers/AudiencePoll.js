import { createNewPoll, pollVote } from "../db";

export const Mutation = {
  async startAudiencePoll(_, { question, yesLabel, noLabel }) {
    return await createNewPoll(question, yesLabel, noLabel);
  },
  async vote(_, { tally }, { currentPlayer }) {
    if (!currentPlayer) throw new Error("you must be logged in to vote");
    await pollVote(currentPlayer.login, tally);
    return true;
  }
};
