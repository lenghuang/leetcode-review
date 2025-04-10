interface IConfig {
  RC_HOST: string;
  LC_HOST: string;
  RC_LOGIN_PATH: string;
  LC_LOGIN_PATH: string;
}

// Define shared configuration variables
const SharedConfig = {
  LC_HOST: 'https://leetcode.com',
  RC_LOGIN_PATH: '/sign-in?isExtension=true',
  LC_LOGIN_PATH: '/accounts/login',
};

// Development environment configuration
const DevConfig: IConfig = {
  RC_HOST: 'http://localhost:3000',
  ...SharedConfig, // Include shared config
};

// Production environment configuration
const ProdConfig: IConfig = {
  RC_HOST: 'https://www.recode.com', // Replace with your production Recode host
  ...SharedConfig, // Include shared config
};

// Determine the environment (you might use process.env.NODE_ENV or similar)
const isDev = true;

// Export the appropriate configuration based on the environment
export const Config: IConfig = isDev ? DevConfig : ProdConfig;
