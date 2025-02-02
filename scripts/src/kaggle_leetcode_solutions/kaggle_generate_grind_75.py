import json
import time

from baml_client.sync_client import b
from baml_client.types import MultipleChoiceV0Question
from clients.supabaseserviceclient import SupabaseServiceRoleClient
from leetcode_graphql import lc_favorite_question_list


# Needed to serialize into JSON
def multiplechoicev0_to_json(data: [MultipleChoiceV0Question]):
    res = []
    for question in data:

        display_answers = []
        for answer in question.displayAnswers:
            display_answers.append({
                "displayChoice": answer.displayChoice,
                "feedback": answer.feedback,
                "isCorrect": answer.isCorrect
            })

        res.append({
            "displayQuestion": question.displayQuestion,
            "displayAnswers": display_answers
        })
    return res

def execute():

    # https://leetcode.com/problem-list/rab78cw1/
    # Numbers should correspond with ImportedQuestionsAndSolutions source_id
    question_ids = lc_favorite_question_list.fetch("rab78cw1")

    print(f"Leetcode GraphQL Response Data Count: {len(question_ids)}\n")

    # Get the supabase entries that are just Python and just the same question ID
    supabase = SupabaseServiceRoleClient()
    response = (
        supabase.table("ImportedQuestionsAndSolutions")
        .select("""
            id,
            source,
            source_id,
            data->>language,
            data
        """, count="exact")
        .eq("source", "kaggle/erichartford/leetcode-solutions-combined")
        .eq("data->>language", "python")
        .in_("source_id", question_ids)
        .execute()
    )

    print(f"Supabase Response Data Count: {response.count}\n")

    all_data = response.data[15:16]
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
                        "source": "lh_manual_upload_multiplechoicev0",
                        "version": 0,
                        "version_description": "Messing around with stuff",
                        "data": json_response
                    }
                )
                .execute()
            )

        except Exception as e:
            failed_questions.append(user_data["id"])
            print(f"Exception for {user_data["id"]}. {user_data["title"]}:\n{e}\n")

    print(f"Total questions failed to upload: {failed_questions}")


    return response.data

