const communityAnswerSingleQuery = `
    query communitySolution($topicId: Int!) {
  topic(id: $topicId) {
    id
    viewCount
    topLevelCommentCount
    subscribed
    title
    pinned
    solutionTags {
      name
      slug
    }
    hideFromTrending
    commentCount
    isFavorite
    post {
      id
      voteCount
      voteStatus
      content
      updationDate
      creationDate
      status
      isHidden
      author {
        isDiscussAdmin
        isDiscussStaff
        username
        nameColor
        activeBadge {
          displayName
          icon
        }
        profile {
          userAvatar
          reputation
        }
        isActive
      }
      authorIsModerator
      isOwnPost
    }
  }
}`;

export default communityAnswerSingleQuery;
