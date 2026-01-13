import { z } from 'zod';

const envSchema = z.object({
  GROQ_API_KEY: z.string().min(1),
  RATE_LIMIT: z.coerce.number().min(1).default(6),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);
