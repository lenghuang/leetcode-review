import json

import kagglehub
from clients.supabaseserviceclient import SupabaseServiceRoleClient


def upload():

    # Download latest version
    path = kagglehub.dataset_download("erichartford/leetcode-solutions")

    print("Path to dataset files:", path)

    supabase = SupabaseServiceRoleClient()

    row_count = 1  # specify the number of rows you want to read
    with open(path + "/leetcode-solutions.jsonl") as f:
        for i, line in enumerate(f):
            if i == row_count:  # break the loop after x iterations
                break

            json_obj = json.loads(line)

            question_data_keys = ["id", "slug", "title", "difficulty", "content"]
            question_data = {
                key: json_obj.get(key) for key in question_data_keys if key in json_obj
            }

            response = supabase.table("ImportedQuestions").insert({
                "source": "kaggle/erichartford/leetcode-solutions",
                "source_id": question_data["id"],
                "question_data": question_data
            }).execute()

            supabase_question_id = response.data[0]["id"]

            answers = json_obj["answer"]
            explanation = answers["explanation"]
            for language, solution in answers.items():

                if language == "explanation":
                    continue

                solution_id = question_data["id"] + "-" + language

                supabase.table("ImportedSolutions").insert({
                    "source": "kaggle/erichartford/leetcode-solutions",
                    "question_id": supabase_question_id,
                    "source_id": solution_id,
                    "solution_data": {
                        "solution": solution,
                        "explanation": explanation
                    }
                }).execute()




