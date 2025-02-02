from config import Config
from kaggle_leetcode_solutions import (kaggle_lc_combined,
                                       kaggle_lc_generate_questions,
                                       kaggle_lc_separate)
from llm import free_chat_completions, openai_check

config = Config()


def main():

    if config.is_dev_mode():
        # Keep all my imports
        config.print_variables()
        openai_check.dummy_chat()
        free_chat_completions.dummy_chat()
        kaggle_lc_separate.dummy_check()
        kaggle_lc_combined.dummy_check()

    # Main execution tasks
    kaggle_lc_generate_questions.execute()


if __name__ == "__main__":
    main()
