import json

import kagglehub
from clients.supabaseserviceclient import SupabaseServiceRoleClient


class LeetCodeDataUploader:
    def __init__(self, dataset_path: str = "erichartford/leetcode-solutions"):
        self.dataset_path = dataset_path
        self.supabase = SupabaseServiceRoleClient()
        self.question_data_keys = [
            "id",
            "slug",
            "title",
            "difficulty",
            "content",
        ]

    def download_dataset(self) -> str:
        return kagglehub.dataset_download(self.dataset_path)

    def extract_question_data(self, json_obj):
        return {
            key: json_obj.get(key)
            for key in self.question_data_keys
            if key in json_obj
        }

    def insert_question(self, question_data) -> int:
        response = (
            self.supabase.table("ImportedQuestions")
            .insert(
                {
                    "source": f"kaggle/{self.dataset_path}",
                    "source_id": question_data["id"],
                    "question_data": question_data,
                }
            )
            .execute()
        )
        return response.data[0]["id"]

    def insert_solutions(self, question_id: int, answers, base_id: str):
        explanation = answers["explanation"]
        for language, solution in answers.items():
            if language == "explanation":
                continue

            solution_id = f"{base_id}-{language}"
            self.supabase.table("ImportedSolutions").insert(
                {
                    "source": f"kaggle/{self.dataset_path}",
                    "question_id": question_id,
                    "source_id": solution_id,
                    "solution_data": {
                        "solution": solution,
                        "explanation": explanation,
                    },
                }
            ).execute()

    def process_line(self, line: str):
        try:
            json_obj = json.loads(line)
            question_data = self.extract_question_data(json_obj)
            question_id = self.insert_question(question_data)
            self.insert_solutions(
                question_id, json_obj["answer"], question_data["id"]
            )
        except Exception as e:
            print(f"Error processing line: {e}")


def upload():
    try:
        uploader = LeetCodeDataUploader()
        path = uploader.download_dataset()

        with open(f"{path}/leetcode-solutions.jsonl") as f:
            for i, line in enumerate(f):
                uploader.process_line(line)

    except Exception as e:
        print(f"Upload failed: {e}")


def dummy_check():
    supabase = SupabaseServiceRoleClient()
    response = (
        supabase.table("ImportedQuestions")
        .select("source", count="exact")
        .eq("source", "kaggle/erichartford/leetcode-solutions")
        .execute()
    )
    print(f"[kaggle/erichartford] questions count: {response.count}")

    response = (
        supabase.table("ImportedSolutions")
        .select("source", count="exact")
        .eq("source", "kaggle/erichartford/leetcode-solutions")
        .execute()
    )
    print(f"[kaggle/erichartford] solutions count: {response.count}\n")
