import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT;
export const SECRET_APP = process.env.SECRET_APP;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const SESSION_EXPIRY = process.env.SESSION_EXPIRY;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const WHITELISTED_DOMAINS = process.env.WHITELISTED_DOMAINS;
