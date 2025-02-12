import { z } from 'zod';

// Schema validation against multiple_choice_v0.baml

// class MultipleChoiceV0Question {
//     displayQuestion string
//     displayAnswers MultipleChoiceV0Answer[]
//   }

//   class MultipleChoiceV0Answer {
//     displayChoice string
//     feedback string
//     isCorrect bool
//   }

const MultipleChoiceV0Answer = z.object({
  displayChoice: z.string(),
  feedback: z.string(),
  isCorrect: z.boolean(),
});

const MultipleChoiceV0Question = z.object({
  displayQuestion: z.string(),
  displayAnswers: z.array(MultipleChoiceV0Answer),
});

export const MultipleChoiceV0 = z.array(MultipleChoiceV0Question);
