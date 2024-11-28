const submissionDetailQuery = `
  query submissionDetails($submissionId: Int!) {
    submissionDetails(submissionId: $submissionId) {
      code
      timestamp
      statusCode
      user {
        username
        profile {
          realName
          userAvatar
        }
      }
      lang {
        name
        verboseName
      }
      question {
        questionId
        titleSlug
        hasFrontendPreview
      }
      notes
      flagType
      topicTags {
        tagId
        slug
        name
      }
      runtimeError
      compileError
      lastTestcase
      codeOutput
      expectedOutput
      totalCorrect
      totalTestcases
      fullCodeOutput
      testDescriptions
      testBodies
      testInfo
      stdOutput
    }
  }
`;

export default submissionDetailQuery;
