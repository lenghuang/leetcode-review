import json

import kagglehub
from clients.supabaseserviceclient import SupabaseServiceRoleClient


class CombinedLeetCodeDataUploader:
    def __init__(self, dataset_path: str = "erichartford/leetcode-solutions"):
        self.dataset_path = dataset_path
        self.source_name = f"kaggle/{self.dataset_path}-combined"
        self.supabase = SupabaseServiceRoleClient()

    def download_dataset(self) -> str:
        return kagglehub.dataset_download(self.dataset_path)

    def extract_question_data(self, json_obj):
        question_data = []

        for language in json_obj["answer"].keys():
            if language == "explanation":
                continue

            # Add back all the keys except the specific answer
            data = {
                key: json_obj.get(key) for key in json_obj if key != "answer"
            }

            # Add it back in manually
            data["answer"] = json_obj["answer"][language]
            data["language"] = language
            data["explanation"] = json_obj["answer"]["explanation"]

            question_data.append(data)

        return question_data

    def insert_question(self, data) -> int:
        response = (
            self.supabase.table("ImportedQuestionsAndSolutions")
            .insert(
                {
                    "source": self.source_name,
                    "source_id": data["id"],
                    "data": data,
                }
            )
            .execute()
        )
        return response.data[0]["id"]

    def process_line(self, line: str):
        try:
            json_obj = json.loads(line)
            question_data = self.extract_question_data(json_obj)
            for data in question_data:
                self.insert_question(data)
        except Exception as e:
            print(f"Error processing line: {e}")


def upload():
    try:
        uploader = CombinedLeetCodeDataUploader()
        path = uploader.download_dataset()

        with open(f"{path}/leetcode-solutions.jsonl") as f:
            for i, line in enumerate(f):
                uploader.process_line(line)

    except Exception as e:
        print(f"Upload failed: {e}")


def dummy_check():
    supabase = SupabaseServiceRoleClient()
    response = (
        supabase.table("ImportedQuestionsAndSolutions")
        .select("source", count="exact")
        .eq("source", "kaggle/erichartford/leetcode-solutions-combined")
        .execute()
    )
    print(
        f"[kaggle/erichartford] combined questions count: {response.count}\n"
    )
