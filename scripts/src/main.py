from config import Config
from kaggle_leetcode_solutions import (
    kaggle_lc_generate_questions_proof_of_concept,
)

config = Config()


def main():

    if config.is_dev_mode():
        config.print_variables()

    # Main execution tasks
    kaggle_lc_generate_questions_proof_of_concept.execute()


if __name__ == "__main__":
    main()
