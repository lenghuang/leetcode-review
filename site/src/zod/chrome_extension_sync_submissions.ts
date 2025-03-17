import * as z from 'zod';

const submissionSchema = z.object({
  id: z.number(),
  question_id: z.number(),
  lang: z.string(),
  lang_name: z.string(),
  time: z.string(),
  timestamp: z.number(),
  status: z.number(),
  status_display: z.string(),
  runtime: z.string(),
  url: z.string(),
  is_pending: z.string(),
  title: z.string(),
  memory: z.string(),
  code: z.string(),
  compare_result: z.string(),
  title_slug: z.string(),
  has_notes: z.boolean(),
  flag_type: z.number(),
  frontend_id: z.number(),
});

export const ChromeExtensionSyncSubmissions = z.object({
  submissions: z.object({
    submissions_dump: z.array(submissionSchema),
  }),
});
