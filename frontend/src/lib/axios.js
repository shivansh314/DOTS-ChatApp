import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL:
//     import.meta.env.MODE === "development"
//       ? "http://localhost:5001/api"
//       : "/api",
//   withCredentials: true,
// });



export const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: "http://13.51.207.136:5001/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 Making ${config.method?.toUpperCase()} request to:`,
      config.baseURL + config.url
    );
    console.log("📋 Request config:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      withCredentials: config.withCredentials,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received:`, {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      dataType: typeof response.data,
      dataPreview: Array.isArray(response.data)
        ? `Array with ${response.data.length} items`
        : response.data,
    });
    return response;
  },
  (error) => {
    console.error("❌ Response interceptor error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      responseData: error.response?.data,
    });
    return Promise.reject(error);
  }
);