export type Submission = {
  id: string;
  title: string;
  titleSlug: string;
  status: number;
  statusDisplay: string;
  lang: string;
  langName: string;
  runtime: string;
  timestamp: number;
  url: string;
  isPending: boolean;
  memory: string;
  hasNotes: boolean;
  notes: string;
  flagType: number;
  topicTags: Array<{
    id: string;
  }>;
};

export type SubmissionListSubmissions = Array<Submission>;

export interface SubmissionListQueryResponse {
  questionSubmissionList: {
    lastKey: string;
    hasNext: boolean;
    submissions: SubmissionListSubmissions;
  };
}
