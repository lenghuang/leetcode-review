from config import Config
from kaggle_leetcode_solutions import kaggle_generate_grind_75

config = Config()


def main():

    if config.is_dev_mode():
        config.print_variables()

    # Main execution tasks
    kaggle_generate_grind_75.execute()


if __name__ == "__main__":
    main()
