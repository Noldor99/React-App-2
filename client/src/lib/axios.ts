import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URLL ?? "https://react-app-2-2hys.onrender.com/api",
  withCredentials: true,
})

