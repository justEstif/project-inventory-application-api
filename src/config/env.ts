import { object, string } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const envSchema = object({
  PORT: string().transform(Number),
  NODE_ENV: string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(JSON.stringify(env.error.format(), null, 4));
  process.exit(1);
}

export default env.data;
