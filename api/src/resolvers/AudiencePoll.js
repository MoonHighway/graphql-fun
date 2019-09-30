import { createNewPoll, getCurrentPoll } from "../db";

export const Query = {
  async pollResults() {
    return await getCurrentPoll();
  }
};

export const Mutation = {
  async startAudiencePoll(_, { question, yesLabel, noLabel }) {
    return await createNewPoll(question, yesLabel, noLabel);
  }
};
