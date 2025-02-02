from clients.openrouter import OpenRouter
from config import Config

config = Config()

# https://openrouter.ai/models?max_price=0
# Free limit: 20 requests per minute, 200 per day

DEV_MODELS = [
    "gryphe/mythomax-l2-13b:free",
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
            client = OpenRouter()
            completion = client.chat.completions.create(
                model=model,
                messages=messages,
            )
            res = completion.choices[0].message
            print(f"Successful chat called with {model}\n")
            return res
        except Exception as e:
            print(f"An OpenRouter error occurred with {model}: {e}\n")
            continue

    raise Exception("All models failed")


def dummy_chat():
    create(
        [
            {
                "role": "developer",
                "content": "You give concise expert-level software advice",
            },
            {
                "role": "user",
                "content": "How many r's are in strawberry?"
                + "Answer in less than 500 characters.",
            },
        ]
    )
