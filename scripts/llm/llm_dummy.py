from config import Config
from openai import OpenAI

config = Config()

def chat():
    try:
        # OpenAI Client
        openai_client = OpenAI(api_key=config.OPENAI_API_KEY)
        completion = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "developer",
                    "content": "You are an expert software developer"
                    + "and give concise advice.",
                },
                {"role": "user", "content": "Hello!"},
            ],
        )
        print(completion.choices[0].message)
    except Exception as e:
        print(f"An OpenAI error occurred: {e}\n")

    try:
        # OpenRouter Client
        openrouter_client = OpenAI(
            api_key=config.OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
        )
        completion = openrouter_client.chat.completions.create(
            model="google/gemini-2.0-flash-thinking-exp:free",
            messages=[
                {
                    "role": "developer",
                    "content": "You are an expert software developer"
                    + "and give concise advice.",
                },
                {"role": "user", "content": "Hello!"},
            ],
        )
        print(completion.choices[0].message)
    except Exception as e:
        print(f"An OpenRouter error occurred: {e}\n")
