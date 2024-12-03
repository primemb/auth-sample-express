import { RedisStore } from "connect-redis";
import { createClient } from "redis";

export const setupRedisStore = async () => {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  await redisClient.connect();

  console.log("Connected to Redis");

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "auth-app:",
  });

  return redisStore;
};
