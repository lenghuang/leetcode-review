from config import Config
from openai import OpenAI

config = Config()

# https://openrouter.ai/models?max_price=0
# Free limit: 20 requests per minute, 200 per day

DEV_MODELS = [
    "microsoft/phi-3-medium-128k-instruct:free",
    "huggingfaceh4/zephyr-7b-beta:free",
    "microsoft/phi-3-mini-128k-instruct:free",
    "meta-llama/llama-3.1-8b-instruct:free",
]

FREE_MODELS = [
    "google/gemini-2.0-flash-thinking-exp:free",
    "sophosympatheia/rogue-rose-103b-v0.2:free",
    "meta-llama/llama-3.1-70b-instruct:free",
    "deepseek/deepseek-r1:free",
    "google/gemma-2-9b-it:free",
]


def create(messages=None):
    if not messages or len(messages) == 0:
        raise ValueError("At least one message is required")

    models = DEV_MODELS if config.DEV_MODE else FREE_MODELS

    for model in models:
        try:
            openrouter_client = OpenAI(
                api_key=config.OPENROUTER_API_KEY,
                base_url=config.OPENROUTER_BASE_URL,
            )
            completion = openrouter_client.chat.completions.create(
                model=model,
                messages=messages,
            )
            print(f"{completion.choices[0].message}\n")
            print(f"Successful chat called with {model}\n")
            return
        except Exception as e:
            print(f"An OpenRouter error occurred with {model}: {e}\n")
            continue

    raise Exception("All models failed")
