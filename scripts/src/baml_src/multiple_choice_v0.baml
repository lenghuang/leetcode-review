// Defining a data model for multiple-choice questions.
class Question {
  displayQuestion string
  displayAnswers Answer[]
}

class Answer {
  displayChoice string
  feedback string
  isCorrect bool
}

// Function to extract structured questions from input text.
function ExtractQuestions(content: string) -> Question[] {
  client "OpenRouterSmallFree"
  prompt #"
    Given the following problem description and solution:

    {{ content }}

    Generate at least 5 multiple-choice questions that follow these principles:
    - Each question has exactly one correct answer.
    - Questions should cover a variety of aspects: data structure rationale, time complexity, space complexity, edge cases, and functional application.
    - Provide detailed feedback for each answer choice.

    Format the output in JSON as an array of Question objects.

    {{ ctx.output_format }}
  "#
}

// Test case using a sample LeetCode problem
test sample_questions {
  functions [ExtractQuestions]
  args {
    content #"
      Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
      You may assume that each input would have exactly one solution, and you may not use the same element twice.

      Example:
      Input: nums = [2,7,11,15], target = 9
      Output: [0,1]

      Solution:
      ```python
      def twoSum(nums, target):
          map = {}
          for i, num in enumerate(nums):
              complement = target - num
              if complement in map:
                  return [map[complement], i]
              map[num] = i
          return []
      ```
    "#
  }
}
