from baml_client.sync_client import b
from clients.supabaseserviceclient import SupabaseServiceRoleClient
from config import Config
from llm import free_chat_completions
from prompts import multiple_choice_v0

config = Config()


def get_combined_questions_data():
    supabase = SupabaseServiceRoleClient()
    response = (
        supabase.table("ImportedQuestionsAndSolutions")
        .select("*", count="exact")
        .range(14, 14)  # for debugging
        .eq("source", "kaggle/erichartford/leetcode-solutions-combined")
        .execute()
    )
    return response.data


# Not used
def multiple_choice_v0_chat_completion_with_python(user_input):
    res = free_chat_completions.create(
        [
            {
                "role": "system",
                "content": multiple_choice_v0.get_system_prompt(),
            },
            {"role": "user", "content": user_input},
        ]
    )
    return res


def multiple_choice_v0_chat_completion_with_baml(user_input):
    try:
        if config.is_dev_mode():
            res = b.GenerateMultipleChoiceV0Dev(user_input)
        else:
            res = b.GenerateMultipleChoiceV0(user_input)
        return res
    except Exception as e:
        print(f"MultipleChoiceV0 Baml Error {e}")
        return None


def execute():
    all_data = get_combined_questions_data()
    for data in all_data:
        user_data = data["data"]
        user_input = str(
            {
                key: user_data.get(key)
                for key in data
                if key in ["content", "answer", "explanation"]
            }
        )

        res = multiple_choice_v0_chat_completion_with_baml(user_input)

        print(f"{res}\n")
