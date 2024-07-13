export const jsonExample = JSON.stringify({
  submissionCodeOriginal:
    "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        table = {}\n        for i, n in enumerate(nums):\n            comp = target - n\n            if comp in table and table[comp] != i:\n                return [i, table[target-n]]\n            table[n] = i\n        return []",
  submissionCodeMissing:
    'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        table = {}\n        for i, n in enumerate(nums):\n            <span className="lcrv-missing-line"># [MISSING LINE HERE]</span>\n            if comp in table and table[comp] != i:\n                return [i, table[target-n]]\n            table[n] = i\n        return []',
  correctAnswer: {
    code: "comp = target - n",
    explanation:
      "target - n gives us the complement number. We check its existence, because that implies complement + n exists",
  },
  alternativeAnswers: [
    {
      code: "comp = target * n",
      explanation:
        "This implies that comp / n = target, so we have two numbers that divide into target, instead of sum.",
    },
    {
      code: "comp = target",
      explanation:
        "This would not make sense since this just checks if it's the second time we've seen the target number.",
    },
  ],
});

export const getMultipleChoicePrompt = (
  topics: Array<string>,
  question: string,
  submission: string,
): string => {
  return `
      You are an expert at solving LeetCode Data Structures and Algorithms Problems.
      You are able to deeply understand computer science concepts like these:
      ${topics.join(",")}

      I have a LeetCode question for you. I want you to be able to understand it.
      I also have a solution to that question. I will provide it to you.

      Find the 1-2 lines of code that are the most critical to understanding the logic of the algorithm.
      Avoid choosing lines that just iterates through a list.
      Avoid choosing lines that just initializes a variable(s).
      Avoid choosing lines that just increment index trackers.

      Given those lines of code, give me the original submission content, but with the critical line of code marked as missing.
      Then, generate 2 additional incorrect alternatives to that line of code, along with a short explanation for why it's wrong.
      Also, give me an explanation for why the original line of code is the correct one.

      Here is an example prompt I'd give you.

      Question: "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face=\"monospace\">&nbsp;</font>time complexity?"
      Submission Languge: Python 3
      Submission Code: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        table = {}\n        for i, n in enumerate(nums):\n            comp = target - n\n            if comp in table and table[comp] != i:\n                return [i, table[target-n]]\n            table[n] = i\n        return []"

      Here's the JSON answer I'd expect: ${jsonExample}

      Now, do what I did above, but for the below question and solution.
      Please indicate each line you remove with a properly indented line saying "<span class=\"lcrv-missing-line\">MISSING LINE</span>".
      Do not reveal the answer in the line you remove.
      Make sure all the answers are different.
      Make sure the correct answer is not altered from the code you originally removed.

      Here is the question: ${question}
      You may need to infer what language the below solution uses.
      Here is a solution that works: ${submission}

      Please provide your answer in the specified json format.
      {
          submissionCodeOriginal : string,
          submissionCodeMissing : string,
          correctAnswer : { code: string, explanation: string }
          alternativeAnswers : Array<{ code: string, explanation: string }>
      }
  `;
};
