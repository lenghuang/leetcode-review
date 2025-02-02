from clients.openaiclient import OpenAIClient
from clients.openrouter import OpenRouter

should_use_openai = False
should_use_openrouter = False


def dummy_chat():
    try:
        if should_use_openai:
            client = OpenAIClient()
            completion = client.chat.completions.create(
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
            client = OpenRouter()
            client.chat.completions.create(
                model="meta-llama/llama-3.1-8b-instruct:free",
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
