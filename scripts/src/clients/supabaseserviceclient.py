from config import Config
from supabase import create_client

config = Config()


class SupabaseServiceRoleClient:
    def __init__(self):
        """
        Initialize the SupabaseClient class.
        Has elevated permissions with service role key.

        Args:
        - api_key (str): The API key for OpenAI.
        - base_url (str): The base URL for OpenAI.
        """
        self.client = create_client(
            config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY
        )

    def __getattr__(self, name: str):
        """
        Proxy attribute access to the SupabaseClient.
        Has elevated permissions with service role key.

        Args:
        - name (str): The name of the attribute to access.

        Returns:
        - Any: The attribute or method from the SupabaseClient.
        """
        return getattr(self.client, name)
