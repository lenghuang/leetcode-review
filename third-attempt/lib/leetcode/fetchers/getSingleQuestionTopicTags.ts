import {
  SingleQuestionTopicTagsQueryResponse,
  getSingleQuestionTopicTagsVariables,
  singleQuestionTopicTagsQuery,
} from "../graphql/single-question-topic-tags";
import { leetCodeRequest } from "../leetCodeClient";

export const getSingleQuestionTopicTags = async (
  slug: string,
): Promise<SingleQuestionTopicTagsQueryResponse> => {
  const data = await leetCodeRequest(
    singleQuestionTopicTagsQuery,
    getSingleQuestionTopicTagsVariables(slug),
  );

  return (data ?? {
    question: null,
  }) as SingleQuestionTopicTagsQueryResponse;
};
