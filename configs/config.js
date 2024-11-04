const config = {
  development: {
    BASE_URL: "http://192.168.0.111:3000",
    // BASE_URL: "https://incisafe-manager-backend.onrender.com",
  },
  production: {
    BASE_URL: "https://incisafe-manager-backend.onrender.com",
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
