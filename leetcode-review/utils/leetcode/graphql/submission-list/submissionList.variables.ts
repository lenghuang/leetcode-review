export const getSubmissionListVariables = (slug: string) => {
  return {
    questionSlug: slug,
    offset: 0,
    limit: 5,
    lastKey: null,
  };
};
