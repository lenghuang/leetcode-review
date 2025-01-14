// Given a title slug, get the 15 best answers and their contents

import { getCommunityAnswerParsed } from "../../chatgpt/community-answer/communityAnswer";
import getCommunityAnswerList from "./communityAnswerList";
import getCommunityAnswerSingle from "./communityAnswerSingle";

const getBestCommunityAnswers = async (
  titleSlug: string,
  limit: number = 1
) => {
  let result: any[] = [];
  const solutions = await getCommunityAnswerList("", titleSlug, limit); // cookies not needed

  for (const s of solutions) {
    const contents = await getCommunityAnswerSingle("", s.topicId);
    result.push({ ...s, ...contents });
  }

  let resultParsed: any[] = [];
  for (const r of result) {
    if (r.content) {
      const parsedSolution = await getCommunityAnswerParsed(r.content);
      const parsedSolutionWithHtml = parsedSolution.parsedSolutions.map(
        (s: any) => ({ ...s, htmlCode: s.code.replaceAll("\n", "<br>") })
      );
      const object = { ...r, parsedSolutions: parsedSolutionWithHtml };
      delete object.content;
      resultParsed.push(object);
    }
  }

  return resultParsed;
};

export default getBestCommunityAnswers;
