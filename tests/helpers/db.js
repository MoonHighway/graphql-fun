import Redis from "ioredis";

const db = new Redis(process.env.REDIS_URL);

export const clearAllKeys = async search => {
  const keys = await db.keys(search || "*");
  const pipeline = db.pipeline();
  keys.forEach(key => pipeline.del(key));
  pipeline.exec();
};
