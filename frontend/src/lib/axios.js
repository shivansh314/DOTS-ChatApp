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
  baseURL: "http://16.16.70.146:5001/api",
  withCredentials: true,
});

