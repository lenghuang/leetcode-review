from config import Config
from openai import OpenAI

config = Config()

class OpenAIClient:
    def __init__(self):
        """
        Initialize the OpenRouter class.

        Args:
        - api_key (str): The API key for OpenAI.
        - base_url (str): The base URL for OpenAI.
        """
        self.openai_client = OpenAI(
            api_key=config.OPENAI_API_KEY,
        )

    def __getattr__(self, name: str):
        """
        Proxy attribute access to the OpenAI client.

        Args:
        - name (str): The name of the attribute to access.

        Returns:
        - Any: The attribute or method from the OpenAI client.
        """
        return getattr(self.openai_client, name)
