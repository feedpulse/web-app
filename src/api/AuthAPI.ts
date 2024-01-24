import axios from "axios";
import type {AxiosResponse} from "axios";
import type User from "@/models/User";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const createUserPayload = (email: string, password: string) => ({"email": email, "password": password});

/**
 * Executes a login request to the server.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns Promise<AxiosResponse<string>> - A promise that resolves into a string.
 */
const login = (email: string, password: string): Promise<AxiosResponse<string>> => {
    const payload = createUserPayload(email, password);
    return httpClient.post<string>("/auth/login", payload);
};

/**
 * Executes a register request to the server.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns Promise<AxiosResponse<User>> - A promise that resolves into a User.
 */
const register = (email: string, password: string): Promise<AxiosResponse<User>> => {
    const payload = createUserPayload(email, password);
    return httpClient.post<User>("/auth/register", payload);
};

export const AuthAPI = {
    login,
    register,
}
