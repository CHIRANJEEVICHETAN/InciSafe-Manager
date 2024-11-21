const config = {
  development: {
    BASE_URL: "http://192.168.202.102:3000",

  },
  production: {
    BASE_URL: "https://incisafemanagerserver-eyfdfhgra3b8ggca.centralindia-01.azurewebsites.net",
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
