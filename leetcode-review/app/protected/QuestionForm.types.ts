export interface TopicTag {
  name: string;
  id: string;
  slug: string;
}

export interface Question {
  difficulty: string;
  status: string;
  title: string;
  titleSlug: string;
  topicTags: TopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
}

export interface ProblemsetQuestionList {
  total: number;
  questions: Question[];
}

export interface ProblemsetQuestionListResponse {
  problemsetQuestionList: ProblemsetQuestionList;
}
