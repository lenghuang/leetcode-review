from config import Config
from openai import OpenAI

from .openrouter import OpenRouter

config = Config()

should_use_openai = False
should_use_openrouter = False


def chat():
    try:
        if should_use_openai:
            openai_client = OpenAI(api_key=config.OPENAI_API_KEY)
            completion = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "developer",
                        "content": "You give good software advice",
                    },
                    {"role": "user", "content": "Hello!"},
                ],
            )
            print(f"{completion.choices[0].message}\n")
    except Exception as e:
        print(f"An OpenAI error occurred: {e}\n")

    try:
        if should_use_openrouter:
            openrouter_client = OpenRouter()
            completion = openrouter_client.chat.completions.create(
                model="google/gemini-2.0-flash-thinking-exp:free",
                messages=[
                    {
                        "role": "developer",
                        "content": "You give good software advice",
                    },
                    {"role": "user", "content": "Hello!"},
                ],
            )
            print(f"{completion.choices[0].message}\n")
    except Exception as e:
        print(f"An OpenRouter error occurred: {e}\n")
