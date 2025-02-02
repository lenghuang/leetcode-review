from config import Config
from llm import free_chat_completions, openai_dummy

config = Config()


def main():

    if config.DEV_MODE:
        config.print_variables()
        openai_dummy.chat()

    free_chat_completions.create(
        [
            {
                "role": "developer",
                "content": "You give concise expert-level software advice",
            },
            {
                "role": "user",
                "content": "How do I approach writing a C server/client",
            },
        ]
    )


if __name__ == "__main__":
    main()
