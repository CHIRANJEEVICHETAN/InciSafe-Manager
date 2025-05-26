const config = {
  development: {
    // BASE_URL: "http://192.168.0.106:3000",
    BASE_URL: "https://incisafe-manager-backend.onrender.com",
    GEMINI_API_KEY: "AIzaSyBzOO1SOfGI44W3zZKQlSYleuCQdnH7yVc",
    GOOGLE_CLOUD_API_KEY: "AIzaSyDKbV2_T0sxpjbsL_IidOc4PgCHUIBkgkc",
  },
  production: {
    BASE_URL: "https://incisafe-manager-backend.onrender.com",
    GEMINI_API_KEY: "AIzaSyBzOO1SOfGI44W3zZKQlSYleuCQdnH7yVc",
    GOOGLE_CLOUD_API_KEY: "AIzaSyDKbV2_T0sxpjbsL_IidOc4PgCHUIBkgkc",
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
