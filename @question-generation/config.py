import os
from dotenv import load_dotenv

class Config:
    def __init__(self, dotenv_path=".env"):
        load_dotenv(dotenv_path)
        self.load_environment_variables()

    def load_environment_variables(self):
        for key, value in os.environ.items():
            setattr(self, key, value)

# Usage
# config = Config()
# print(config.YOUR_ENV_VARIABLE)
