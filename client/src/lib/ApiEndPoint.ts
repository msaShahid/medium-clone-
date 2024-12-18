import Env from "./Env";

export const SERVER_ENDPOINT:string = Env.SERVER_ENDPOINT;
export const API_URL: string = `${SERVER_ENDPOINT}/api/v1`;
export const LOGIN_URL: string = `${API_URL}/auth/login`;
export const LOGOUT_URL: string = `${API_URL}/auth/logout`;
export const REGISTER_URL: string = `${API_URL}/auth/register`;
export const VERIFY_CREDENTIALS_URL: string = `${API_URL}/auth/verify-Credentials`;
export const POST_URL: string = `${API_URL}/auth/post`;
export const USER_POSTS_URL: string = `${API_URL}/auth/user/posts`;
