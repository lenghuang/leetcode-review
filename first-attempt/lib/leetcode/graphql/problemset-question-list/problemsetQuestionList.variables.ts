export const getProblemsetQuestionListVariables = () => {
  return {
    categorySlug: "all-code-essentials",
    skip: 0,
    limit: 10,
    filters: {
      status: "AC",
    },
  };
};
