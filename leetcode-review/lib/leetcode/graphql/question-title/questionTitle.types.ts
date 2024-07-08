export interface Question {
  questionId: number;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  isPaidOnly: boolean;
  difficulty: string;
  likes: number;
  dislikes: number;
  categoryTitle: string;
}

export interface QuestionTitleQueryResponse {
  question: Question;
}
