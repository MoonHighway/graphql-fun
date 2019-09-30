import { createNewPoll } from "../db";

export const Mutation = {
  async startAudiencePoll(_, { question, yesLabel, noLabel }) {
    return await createNewPoll(question, yesLabel, noLabel);
  }
};
