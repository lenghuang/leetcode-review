from config import Config
from kaggle_leetcode_solutions import kaggle_generate_grind_75

config = Config()


def main():

    if config.is_dev_mode():
        config.print_variables()

    # Main execution tasks
    kaggle_generate_grind_75.execute()

    # TODO: Let's look into generating different styles of questions
    # for the same 75 questions. Such as free text (ask for brute force),
    # free text (ask for general approach), multiple choice (ask for high
    # level approach), and finally the existing multiple choice. Once we
    # have an extensible way to approach that, we can look into extending
    # it to even more question sets.

if __name__ == "__main__":
    main()
