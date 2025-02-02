import llm
from config import Config

config = Config()


def main():

    if config.DEV_MODE:
        config.print_variables()

    llm.get_dummy_response()


if __name__ == "__main__":
    main()
