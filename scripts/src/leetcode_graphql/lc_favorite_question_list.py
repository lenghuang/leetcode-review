import requests


def fetch(favorite_slug: str = "rab78cw1"):
    url = "https://leetcode.com/graphql/"
    headers = {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
    }
    payload = {
        "query": """
            query favoriteQuestionList(
                $favoriteSlug: String!,
                $filter: FavoriteQuestionFilterInput,
                $filtersV2: QuestionFilterInput,
                $searchKeyword: String,
                $sortBy: QuestionSortByInput,
                $limit: Int,
                $skip: Int,
                $version: String = "v2"
            ) {
              favoriteQuestionList(
                favoriteSlug: $favoriteSlug
                filter: $filter
                filtersV2: $filtersV2
                searchKeyword: $searchKeyword
                sortBy: $sortBy
                limit: $limit
                skip: $skip
                version: $version
              ) {
                questions {
                  id
                }
              }
            }
        """,
        "variables": {
            "skip": 0,
            "limit": 100,
            "favoriteSlug": favorite_slug,
            "filtersV2": {
                "filterCombineType": "ALL",
                "statusFilter": {"questionStatuses": [], "operator": "IS"},
                "difficultyFilter": {"difficulties": [], "operator": "IS"},
                "languageFilter": {"languageSlugs": [], "operator": "IS"},
                "topicFilter": {"topicSlugs": [], "operator": "IS"},
                "companyFilter": {"companySlugs": [], "operator": "IS"},
                "positionFilter": {"positionSlugs": [], "operator": "IS"},
                "premiumFilter": {"premiumStatus": [], "operator": "IS"},
            },
            "searchKeyword": "",
            "sortBy": {"sortField": "FRONTEND_ID", "sortOrder": "ASCENDING"},
        },
        "operationName": "favoriteQuestionList",
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()
        question_ids = [
            q["id"]
            for q in data.get("data", {})
            .get("favoriteQuestionList", {})
            .get("questions", [])
        ]
        return question_ids
    else:
        print("Error:", response.status_code, response.text)
        return []


# Example usage
# ids = fetch_favorite_question_ids()
# print(ids)
