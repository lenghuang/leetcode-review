export interface SubmissionDetailQueryResponse {
  submissionDetails: {
    code: string;
    timestamp: number;
    statusCode: number;
    user: {
      username: string;
      profile: {
        realName: string;
        userAvatar: string;
      };
    };
    lang: {
      name: string;
      verboseName: string;
    };
    question: {
      questionId: number;
      titleSlug: string;
      hasFrontendPreview: boolean;
    };
    notes: string;
    flagType: number;
    topicTags: Array<{
      tagId: number;
      slug: string;
      name: string;
    }>;
    runtimeError: string;
    compileError: string;
    lastTestcase: string;
    codeOutput: string;
    expectedOutput: string;
    totalCorrect: number;
    totalTestcases: number;
    fullCodeOutput: string;
    testDescriptions: string[];
    testBodies: string[];
    testInfo: string[];
    stdOutput: string[];
  };
}
