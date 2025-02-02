from config import Config
from openai import OpenAI


def main():

    # Load in the variables
    config = Config()

    if config.DEV_MODE:
        config.print_variables()

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
        open_router_client = OpenAI(
            api_key=config.OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
        )
        completion = open_router_client.chat.completions.create(
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


if __name__ == "__main__":
    main()
