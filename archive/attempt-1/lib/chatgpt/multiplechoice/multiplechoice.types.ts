export interface Answer {
  code: string;
  explanation: string;
}

export interface FillInTheBlankProblem {
  correctAnswer: Answer;
  alternativeAnswers: Answer[];
}
