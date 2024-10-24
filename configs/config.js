const config = {
  development: {
    BASE_URL: "http://192.168.0.111:3000",
  },
  production: {
    BASE_URL: "https://your-production-url.com",
  },
};

const getConfig = () => {
  if (__DEV__) {
    // Development environment
    return config.development;
  } else {
    // Production environment
    return config.production;
  }
};

export default getConfig;
