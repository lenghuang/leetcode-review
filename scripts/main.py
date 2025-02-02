from config import Config
from database import (
    kaggle_leetcode_solutions,
    kaggle_leetcode_solutions_combined,
)
from llm import free_chat_completions, openai_check

config = Config()


def main():

    if config.is_dev_mode():
        # Keep all my imports
        config.print_variables()
        openai_check.dummy_chat()
        free_chat_completions.dummy_chat()
        kaggle_leetcode_solutions.dummy_check()
        kaggle_leetcode_solutions_combined.dummy_check()

    # Main execution tasks
    kaggle_leetcode_solutions_combined.upload()


if __name__ == "__main__":
    main()
