import axios from "axios";

// FIX 4: The frontend .env only had REACT_APP_API_URL=http://localhost:5000/api.
//         In production (Netlify / Vercel / any static host) that env var must
//         be set to the deployed backend URL, e.g.:
//           REACT_APP_API_URL=https://your-backend.vercel.app/api
//
//         Set this in:
//           • frontend/.env.production  (for local "npm run build" deploys)
//           • Your hosting dashboard    (Netlify / Vercel env vars UI)
//
//         The fallback below still works for local dev.

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Required to send/receive the httpOnly auth cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Global response interceptor: surface API error messages cleanly
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Attach backend error message to the thrown error so callers can use it
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  },
);

export default apiClient;
