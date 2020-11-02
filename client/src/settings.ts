export const API_URL = process.env.NODE_ENV === "production" ? "/api" : `http://localhost:5000/api`
export const USERS_PAGINATION_PORTION = 20