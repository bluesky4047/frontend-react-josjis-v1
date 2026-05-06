import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// AUTO REFRESH
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (
      err.response?.status === 401 &&
      !original._retry &&
      !original.url.includes("/auth/admin/logout") &&
      !original.url.includes("/auth/admin/refresh-token")
    ) {
      original._retry = true;

      try {
        await api.get("/auth/admin/refresh-token");
        return api(original);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  },
);

export const authApi = {
  signin: (data) => api.post("/auth/admin/login", data),
  me: () => api.get("/auth/admin/me"),
  logout: () => api.post("/auth/admin/logout"),
};

export default api;
