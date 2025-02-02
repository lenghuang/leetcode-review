from dotenv import dotenv_values


class Config:
    def __init__(self, dotenv_path=".env"):
        # Load just the values in the .env file into Config object
        env_vars = dotenv_values(dotenv_path)
        for key, value in env_vars.items():
            setattr(self, key, value)

    def print_variables(self):
        print("Loaded Environment Variables")
        for key, value in vars(self).items():
            print(f"{key}: {value}")
        print()

    def is_dev_mode(self):
        # Check if dev_mode (case insensitive) is set to a truthy value
        return self.DEV_MODE.lower() in ["true", "yes", "1", "on"]


# Usage
# config = Config()
# print(config.YOUR_ENV_VARIABLE)
# print(config.is_dev_mode())
