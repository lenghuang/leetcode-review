from config import Config
from openai import OpenAI

# https://openrouter.ai/models?max_price=0
# Free limit: If you are using a free model variant
# (with an ID ending in :free), then you will be limited
# to 20 requests per minute and 200 requests per day.

config = Config()

free_models_dev = [
    "microsoft/phi-3-medium-128k-instruct:free",
    "huggingfaceh4/zephyr-7b-beta:free",
    "microsoft/phi-3-mini-128k-instruct:free",
    "meta-llama/llama-3.1-8b-instruct:free",
]

free_models = [
    "google/gemini-2.0-flash-thinking-exp:free",
    "sophosympatheia/rogue-rose-103b-v0.2:free",
    "meta-llama/llama-3.1-70b-instruct:free",
    "deepseek/deepseek-r1:free",
    "google/gemma-2-9b-it:free",
]


def create(messages=[]):

    models = free_models_dev if config.DEV_MODE else free_models

    for model in models:
        try:
            openrouter_client = OpenAI(
                api_key=config.OPENROUTER_API_KEY,
                base_url="https://openrouter.ai/api/v1",
            )
            completion = openrouter_client.chat.completions.create(
                model=free_models[0],
                messages=messages,
            )
            print(f"Successful chat called with {model}\n")
            print(f"{completion.choices[0].message}\n")
            return
        except Exception as e:
            print(f"An OpenRouter error occurred with {model}: {e}\n")
            continue

    return None  # Return None if all models fail
