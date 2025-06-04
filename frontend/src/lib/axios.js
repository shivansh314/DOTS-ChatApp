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

