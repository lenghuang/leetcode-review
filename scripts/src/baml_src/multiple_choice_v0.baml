// Defining a data model for multiple-choice questions.
class MultipleChoiceV0Question {
  displayQuestion string
  displayAnswers MultipleChoiceV0Answer[]
}

class MultipleChoiceV0Answer {
  displayChoice string
  feedback string
  isCorrect bool
}

template_string MultipleChoiceV0Prompt(question_data: string) #"
  You're a LeetCode pedagogy expert designing multiple choice questions that reveal nuanced understanding.

  **Core Principles:**

  1.  Single Correct Answer: Each question must have exactly one correct answer.

  2.  Diverse Question Types: Create questions that cover a range of topics, including but not limited to:
      - Data Structure Rationale: Why a particular data structure was chosen (e.g., hash map, array, linked list).
      - Time Complexity Analysis: Understanding the efficiency of the algorithm in terms of time.
      - Space Complexity Analysis: Understanding the memory usage of the algorithm.
      - Algorithmic Approach: The overall strategy of the solution (e.g., iterative, recursive, divide and conquer).
      - Functional Application: Questions that require applying the code to a specific scenario and arriving at a numerical or logical output given a simulated input. These should vary from examples directly in the problem description to those that use similar input parameters.
      - Edge Case Understanding: Questions that test understanding of constraints and what kind of inputs might break the code or cause incorrect behavior.

  3.  Specific and Encouraging Feedback:
      - Correct Answers: Provide positive and confirmatory feedback, reinforcing the user's understanding. Be specific!
      - Incorrect Answers: Offer gentle, guiding feedback, hinting at the correct answer or a key concept, without giving it away directly. Provide a hint that forces the user to re-evaluate the underlying concept they are being asked about.
      - For both forms of feedback, limit it to one or two sentences.

  Given some data about code and explanation come up with multiple-choice questions, each with one correct answer, and feedback for each choice.

  **Example Interaction:**

  Input Chat: {'content': 'Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.\n\nYou may assume that each input would have _exactly_ one solution, and you may not use the _same_ element twice.\n\nYou can return the answer in any order.\n\nExample 1:\n\nInput: nums = \\[2,7,11,15\\], target = 9\nOutput: \\[0,1\\]\nExplanation: Because nums\\[0\\] + nums\\[1\\] == 9, we return \\[0, 1\\].\n\nExample 2:\n\nInput: nums = \\[3,2,4\\], target = 6\nOutput: \\[1,2\\]\n\nExample 3:\n\nInput: nums = \\[3,3\\], target = 6\nOutput: \\[0,1\\]\n\nConstraints:\n\n   `2 <= nums.length <= 104`\n   `-109 <= nums[i] <= 109`\n   `-109 <= target <= 109`\n   Only one valid answer exists.\n\nFollow-up: Can you come up with an algorithm that is less than `O(n2)` time complexity?', 'answer': '```python\ndef twoSum(nums, target):\n    map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in map:\n            return [map[complement], i]\n        map[num] = i\n    return []\n```\n', 'explanation': "The algorithm leverages a hash map (unordered_map in C++, HashMap in Java, dictionary in Python, and Map in JavaScript). It iterates through the given 'nums' array and calculates the complementary value (target - current value). If the complementary value is already in the hash map, it means that we found a solution, and we return those indices. If the complement is not in the hash map, we store the current element in the hash map with its index. If the algorithm doesn't find the solution, it returns an empty array or throws an exception (in Java).\n\nThis approach has a time complexity of O(n) and a space complexity of O(n) as well."}
  Model Solution: {'questions': [{'displayQuestion': 'What is the primary reason for using a hash map?', 'displayAnswers': [{'displayChoice': 'To sort the array in O(n log n) time', 'feedback': 'Not quite, does a hash map actually help us sort?', 'isCorrect': False}, {'displayChoice': "To store each number's index for constant-time lookup of the complement", 'feedback': "That's absolutely correct! You're showing a great understanding of hashmap usage here", 'isCorrect': True}, {'displayChoice': 'To recursively break down the array into subarrays', 'feedback': "Hm, there doesn't seem to be any recursive calls here", 'isCorrect': False}, {'displayChoice': 'To reduce the space complexity to O(1)', 'feedback': 'Well, the space complexity of a hash map is what?', 'isCorrect': False}]}, {'displayQuestion': 'What is the time complexity of the algorithm?', 'displayAnswers': [{'displayChoice': 'O(n log n)', 'feedback': 'Not quite, remember that a hashmap takes O(1) time to insert and look up values, so where does this logn come from?', 'isCorrect': False}, {'displayChoice': 'O(n)', 'feedback': "That's absolutely correct! This algorithm iterates once through the input with consistent lookup times", 'isCorrect': True}, {'displayChoice': 'O(n^2)', 'feedback': 'Hm, where do you think that nested loop is in this algorithm?', 'isCorrect': False}, {'displayChoice': 'O(log n)', 'feedback': 'Well, remember that we have to go through each of the inputs, not just a subdivision', 'isCorrect': False}]}]}

  **Your Task:**

  Given the following question data, generate at least 5 questions tackling different areas, keeping in mind the core principles and example interactions.

  Question Data
  ---
  {{ question_data }}
  ---
"#


// Function to extract structured questions from input text.
function GenerateMultipleChoiceV0(question_data: string) -> MultipleChoiceV0Question[] {
  client "OpenRouterBigFree"
  prompt #"
    {{ MultipleChoiceV0Prompt(question_data) }}
    {{  ctx.output_format }}
  "#
}

// Function to extract structured questions from input text.
function GenerateMultipleChoiceV0Dev(question_data: string) -> MultipleChoiceV0Question[] {
  client "OpenRouterSmallFree"
  prompt #"
    {{ MultipleChoiceV0Prompt(question_data) }}
    {{  ctx.output_format }}
  "#
}

function GenerateMultipleChoiceV0Paid(question_data: string) -> MultipleChoiceV0Question[] {
  client "OpenRouterGeminiFlash15Paid"
  prompt #"
    {{ MultipleChoiceV0Prompt(question_data) }}
    {{  ctx.output_format }}
  "#
}

function GenerateMultipleChoiceV0PaidCheap(question_data: string) -> MultipleChoiceV0Question[] {
  client "OpenRouterMetaLlama321bInstruct"
  prompt #"
    {{ MultipleChoiceV0Prompt(question_data) }}
    {{  ctx.output_format }}
  "#
}

// Test case using a sample LeetCode problem
test length_of_longest_substring {
  functions [GenerateMultipleChoiceV0Dev, GenerateMultipleChoiceV0PaidCheap]
  args {
    question_data #"
      {
        'content': 'Given a string `s`, find the length of the **longest** **substring** without repeating characters.\n\n**Example 1:**\n\n**Input:** s =  "abcabcbb "\n**Output:** 3\n**Explanation:** The answer is  "abc ", with the length of 3.\n\n**Example 2:**\n\n**Input:** s =  "bbbbb "\n**Output:** 1\n**Explanation:** The answer is  "b ", with the length of 1.\n\n**Example 3:**\n\n**Input:** s =  "pwwkew "\n**Output:** 3\n**Explanation:** The answer is  "wke ", with the length of 3.\nNotice that the answer must be a substring,  "pwke " is a subsequence and not a substring.\n\n**Constraints:**\n\n*   `0 <= s.length <= 5 * 104`\n*   `s` consists of English letters, digits, symbols and spaces.',
        'answer': '```python\ndef length_of_longest_substring(s: str) -> int:\n    left = 0\n    right = 0\n    max_length = 0\n    characters = set()\n\n    while right < len(s):\n        if s[right] not in characters:\n            characters.add(s[right])\n            max_length = max(max_length, right - left + 1)\n            right += 1\n        else:\n            characters.remove(s[left])\n            left += 1\n\n    return max_length\n```\n',
        'explanation': "The algorithm uses a sliding window with two pointers, left and right, to iterate through the string. It also uses a set to store the unique characters in the current window.\n\n1. Initialize left and right pointers to the start of the string, and maxLength to 0.\n2. Check if the character at the right index is in the set.\n   - If it's not in the set, add the character to the set, update maxLength, and move the right pointer forward.\n   - If it's in the set, remove the character at the left index from the set, and move the left pointer forward.\n3. Repeat step 2 until the right pointer reaches the end of the string.\n4. Return maxLength. \n\nThe algorithm runs in O(n) time, where n is the length of the input string."
      }
    "#
  }
}
