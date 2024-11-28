const config = {
  development: {
    BASE_URL: "http://192.168.0.108:3000",
    GEMINI_API_KEY: "AIzaSyBnq3yyUg63Eb3a-3jnBuVR6JT5D7zlaBY",
    GOOGLE_CLOUD_API_KEY: "AIzaSyDKbV2_T0sxpjbsL_IidOc4PgCHUIBkgkc"
  },
  production: {
    BASE_URL: "https://incisafemanagerserver-eyfdfhgra3b8ggca.centralindia-01.azurewebsites.net",
    GEMINI_API_KEY: "AIzaSyBnq3yyUg63Eb3a-3jnBuVR6JT5D7zlaBY",
    GOOGLE_CLOUD_API_KEY: "AIzaSyDKbV2_T0sxpjbsL_IidOc4PgCHUIBkgkc"
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
