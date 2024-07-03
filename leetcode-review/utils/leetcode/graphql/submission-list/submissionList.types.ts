// Types for query response
export interface SubmissionListQueryResponse {
  questionSubmissionList: {
    lastKey: string;
    hasNext: boolean;
    submissions: Array<{
      id: string;
      title: string;
      titleSlug: string;
      status: number;
      statusDisplay: string;
      lang: number;
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
    }>;
  };
}
