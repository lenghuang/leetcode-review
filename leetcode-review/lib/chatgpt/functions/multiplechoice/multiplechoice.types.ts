export interface Answer {
  code: string;
  explanation: string;
}

export interface FillInTheBlankProblem {
  submissionCodeOriginal: string;
  submissionCodeMissing: string;
  correctAnswer: Answer;
  alternativeAnswers: Answer[];
}
