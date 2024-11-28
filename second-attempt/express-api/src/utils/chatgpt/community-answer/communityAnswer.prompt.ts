export const getCommunityAnswerSystemPrompt = (): string => {
  return `
            I am giving you some data about a solution someone wrote for a Leetcode algorithms question. I will give you one long content that might contain multiple solutions and multiple explanations for that solution.

            Here's an example: ${getExampleContent()}

            Here's the JSON answer I'd expect: ${getJsonExample()}

            Please provide your answer in the specified json format.
            {
                parsedSolutions : Array<{ code: string, language: string }>
            }

            I am going to give you another example. Please repeat the same thing, but for the new content.
        `;
};

export const getCommunityAnswerUserPrompt = (content: string): string => {
  return content;
};

const getExampleContent = () => `
# **PROBLEM STATEMENT:**
Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

# **Example:**
# Input: nums = [2,1,5,0,4,6]
# Output: true
# Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.

# **Java Solution:**
\`\`\`
// Time Complexity : O(n)
// Space Complexity : O(1)
class Solution {
    public boolean increasingTriplet(int[] nums) {
        // Initialize two variables first and second with Integer.MAX_VALUE...
        int first = Integer.MAX_VALUE;
        int second = Integer.MAX_VALUE;
        for(int third : nums) {
            // If the third is smaller than the first variable then make first = third...
            if(third < first){
                first = third;
            }
            // If the third is in between the first and second then move second to third place...
            else if(third < second && third > first){
                second = third;
            }
            // If the right is greater than the first and second then return true...
            else if(third > second && third > first) return true;
        }
        // After the end of the loop if no such Increasing Triplet Subsequence indices exists then return false...
        return false;
    }
}
\`\`\`

# **C++ Solution:**
\`\`\`
// Time Complexity : O(n)
// Space Complexity : O(1)
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        // Initialize two variables first and second with INT_MAX...
        int first = INT_MAX;
        int second = INT_MAX;
        // Iterate from beg to end in the nums array...
        for(int i = 0; i < nums.size(); i++){
            int third = nums[i];
            // If the third is smaller than the first variable then make first = third...
            if(third < first){
                first = third;
            }
            // If the third is in between the first and second then move second to third place...
            else if(third < second && third > first){
                second = third;
            }
            // If the right is greater than the first and second then return true...
            else if(third > second && third > first) return true;
        }
        // After the end of the loop if no such Increasing Triplet Subsequence indices exists then return false...
        return false;
    }
};
\`\`\`

# **Python / Python3 solution:**
\`\`\`
# Time Complexity : O(n)
# Space Complexity : O(1)
class Solution(object):
    def increasingTriplet(self, nums):
        # Initialize two variables first and second
        first, second = float('inf'), float('inf')
        for third in nums:
            # If the third is smaller than the first variable then make first = third...
            if third < first:
                first = third
            # If the third is in between the first and second then move second to third place...
            elif third < second and third > first:
                second = third
            # Otherwise, return true...
            else: return True
        # After the end of the loop if no such Increasing Triplet Subsequence indices exists then return false...
        return False
\`\`\`

# **JavaScript Solution:**
\`\`\`
// Time Complexity : O(n)
// Space Complexity : O(1)
var increasingTriplet = function(nums) {
    let first = Infinity;
    let second = Infinity;
    for(let third of nums) {
        // If the third is smaller than the first variable then make first = third...
        if(third < first){
            first = third;
        }
        // If the third is in between the first and second then move second to third place...
        else if(third < second && third > first){
            second = third;
        }
        // If the right is greater than the first and second then return true...
        else if(third > second && third > first) return true;
    }
    // After the end of the loop if no such Increasing Triplet Subsequence indices exists then return false...
    return false;
};
\`\`\`

**I am working hard for you guys... Please upvote if you found any help with this code...**
`;

const getJsonExample = () =>
  JSON.stringify({
    parsedSolutions: [
      {
        code: "class Solution {\\n    public boolean increasingTriplet(int[] nums) {\\n        int first = Integer.MAX_VALUE;\\n        int second = Integer.MAX_VALUE;\\n        for(int third : nums) {\\n            if(third < first){\\n                first = third;\\n            } else if(third < second && third > first){\\n                second = third;\\n            } else if(third > second && third > first) return true;\\n        }\\n        return false;\\n    }\\n}",
        language: "java",
      },
      {
        code: "class Solution {\\npublic:\\n    bool increasingTriplet(vector<int>& nums) {\\n        int first = INT_MAX;\\n        int second = INT_MAX;\\n        for(int i = 0; i < nums.size(); i++){\\n            int third = nums[i];\\n            if(third < first){\\n                first = third;\\n            } else if(third < second && third > first){\\n                second = third;\\n            } else if(third > second && third > first) return true;\\n        }\\n        return false;\\n    }\\n};",
        language: "cpp",
      },
      {
        code: "class Solution(object):\\n    def increasingTriplet(self, nums):\\n        first, second = float('inf'), float('inf')\\n        for third in nums:\\n            if third < first:\\n                first = third\\n            elif third < second and third > first:\\n                second = third\\n            else: return True\\n        return False",
        language: "python3",
      },
      {
        code: "var increasingTriplet = function(nums) {\\n    let first = Infinity;\\n    let second = Infinity;\\n    for(let third of nums) {\\n        if(third < first){\\n            first = third;\\n        } else if(third < second && third > first){\\n            second = third;\\n        } else if(third > second && third > first) return true;\\n    }\\n    return false;\\n};",
        language: "javascript",
      },
    ],
  });
