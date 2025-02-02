from config import Config
from llm import llm_dummy

config = Config()


def main():

    if config.DEV_MODE:
        config.print_variables()

    llm_dummy.chat()


if __name__ == "__main__":
    main()
