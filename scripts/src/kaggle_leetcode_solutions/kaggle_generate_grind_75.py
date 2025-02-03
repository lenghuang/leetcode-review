from baml_client.sync_client import b
from baml_client.types import MultipleChoiceV0Question
from clients.supabaseserviceclient import SupabaseServiceRoleClient
from leetcode_graphql import lc_favorite_question_list

import_source = "kaggle/erichartford/leetcode-solutions-combined"
source = "lh_manual_upload_multiplechoicev0"
version = 2
version_description = "Second try with o1 mini, first time stopped halfway"


# Needed to serialize into JSON
def multiplechoicev0_to_json(data: [MultipleChoiceV0Question]):
    res = []
    for question in data:

        display_answers = []
        for answer in question.displayAnswers:
            display_answers.append(
                {
                    "displayChoice": answer.displayChoice,
                    "feedback": answer.feedback,
                    "isCorrect": answer.isCorrect,
                }
            )

        res.append(
            {
                "displayQuestion": question.displayQuestion,
                "displayAnswers": display_answers,
            }
        )
    return res


def execute():

    # https://leetcode.com/problem-list/rab78cw1/
    # Numbers should correspond with ImportedQuestionsAndSolutions source_id
    question_ids = lc_favorite_question_list.fetch("rab78cw1")

    print(f"Leetcode GraphQL Response Data Count: {len(question_ids)}\n")

    # Get the supabase entries that are just Python and the same question ID
    supabase = SupabaseServiceRoleClient()
    imported_response = (
        supabase.table("ImportedQuestionsAndSolutions")
        .select(
            """
            id,
            source,
            source_id,
            data->>language,
            data
        """,
            count="exact",
        )
        .eq("source", import_source)
        .eq("data->>language", "python")
        .in_("source_id", question_ids)
        .execute()
    )

    print(f"Supabase Response Data Count: {imported_response.count}\n")

    # Filter out source / source_id / version combos that are already in the DB
    uploaded_response = (
        supabase.table("GeneratedQuestions")
        .select(
            """
            id,
            source,
            source_id,
            version
        """,
            count="exact",
        )
        .eq("source", source)
        .eq("version", version)
        .in_("source_id", question_ids)
        .execute()
    )

    print(f"Supabase Already Made Questions Count: {uploaded_response.count}\n")

    existing_source_ids = {
        item["source_id"] for item in uploaded_response.data
    }
    all_data = [
        item
        for item in imported_response.data
        if item["source_id"] not in existing_source_ids
    ]

    failed_questions = []

    for data in all_data:
        try:
            user_data = data["data"]
            user_input = str(
                {
                    key: user_data.get(key)
                    for key in user_data
                    if key in ["content", "answer", "explanation"]
                }
            )

            baml_response = b.GenerateMultipleChoiceV0Paid(user_input)
            json_response = multiplechoicev0_to_json(baml_response)

            db_response = (
                supabase.table("GeneratedQuestions")
                .insert(
                    {
                        "imported_questions_and_solutions_id": data["id"],
                        "source_id": user_data["id"],
                        "source": source,
                        "version": version,
                        "version_description": version_description,
                        "data": json_response,
                    }
                )
                .execute()
            )

            print(f"Supabase Upload Response: {db_response}\n")

        except Exception as e:
            failed_questions.append(user_data["id"])
            print(f"{user_data["id"]}. {user_data["title"]}:\n{e}\n")

    print(f"Total questions failed to upload: {failed_questions}")
