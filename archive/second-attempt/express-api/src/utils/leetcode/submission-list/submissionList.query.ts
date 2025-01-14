const submissionListQuery = `
  query submissionList(
    $offset: Int!
    $limit: Int!
    $lastKey: String
    $questionSlug: String!
    $lang: Int
    $status: Int
  ) {
    questionSubmissionList(
      offset: $offset
      limit: $limit
      lastKey: $lastKey
      questionSlug: $questionSlug
      lang: $lang
      status: $status
    ) {
      lastKey
      hasNext
      submissions {
        id
        title
        titleSlug
        status
        statusDisplay
        lang
        langName
        runtime
        timestamp
        url
        isPending
        memory
        hasNotes
        notes
        flagType
        topicTags {
          id
        }
      }
    }
  }
`;

export default submissionListQuery;
