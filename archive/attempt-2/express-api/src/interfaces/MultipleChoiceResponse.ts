export interface Answer {
  code: string;
  explanation: string;
}

export interface FillInTheBlankAnswerData {
  correctAnswer: Answer;
  alternativeAnswers: Answer[];
}
