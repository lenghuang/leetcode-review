from config import Config
from openai import OpenAI

# https://openrouter.ai/models?max_price=0

config = Config()

free_models = [
    "google/gemini-2.0-flash-thinking-exp:free",
    "sophosympatheia/rogue-rose-103b-v0.2:free",
    "deepseek/deepseek-r1:free",
    "meta-llama/llama-3.1-70b-instruct:free",
    "google/gemma-2-9b-it:free"
]

def create(messages=[]):
    for model in free_models:
        try:
            openrouter_client = OpenAI(
                api_key=config.OPENROUTER_API_KEY,
                base_url="https://openrouter.ai/api/v1",
            )
            completion = openrouter_client.chat.completions.create(
                model=model,
                messages=messages
            )
            print(f"{completion.choices[0].message}\n")
            return
        except Exception as e:
            print(f"An OpenRouter error occurred: {e}\n")
            continue

    return None  # Return None if all models fail