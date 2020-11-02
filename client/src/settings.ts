export const BASE_URL = process.env.NODE_ENV === "production" ? "/" : `http://localhost:5000/`
export const API_URL = BASE_URL + "api"
export const USERS_PAGINATION_PORTION = 20