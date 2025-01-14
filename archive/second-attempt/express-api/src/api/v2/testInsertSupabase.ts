import express from "express";
import { insertLeetcodeQuestion } from "../../utils/supabase/";

const router = express.Router();

const testJson = {
  id: "431735395",
  title: "Two Sum",
  titleSlug: "two-sum",
  lang: "python3",
  langName: "Python3",
  url: "/submissions/detail/431735395/",
  timestamp: "1608235581",
  topicTags: ["Array", "Hash Table"],
  code: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        table = {}\n        for i, n in enumerate(nums):\n            comp = target - n\n            if comp in table and table[comp] != i:\n                return [i, table[target-n]]\n            table[n] = i\n        return []",
};

router.get("/", async (req, res) => {
  const success = await insertLeetcodeQuestion(testJson);

  return res.json({ success });
});

export default router;
