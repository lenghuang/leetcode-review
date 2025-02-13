import { z } from 'zod';

export const KaggleDatasetQuestionMetadata = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  answer: z.string(),
  content: z.string(),
  language: z
    .union([
      z.literal('c++'),
      z.literal('java'),
      z.literal('javascript'),
      z.literal('python'),
      z.literal('other'),
    ])
    .default('other'),
  difficulty: z
    .union([z.literal('Easy'), z.literal('Medium'), z.literal('Hard')])
    .default('Medium'),
  explanation: z.string(),
});
