import type {AxiosResponse} from "axios";
import type User from "@/models/User";
import APIBase from "@/api/APIBase";
import type Jwt from "@/models/Jwt";

class AuthAPI extends APIBase {

    #createUserPayload = (email: string, password: string) => ({"email": email, "password": password});

    /**
     * Executes a login request to the server.
     * @param email - The user's email.
     * @param password - The user's password.
     * @returns Promise<AxiosResponse<string>> - A promise that resolves into a string.
     */
    public login = (email: string, password: string): Promise<AxiosResponse<Jwt>> => {
        const payload = this.#createUserPayload(email, password);
        return this.httpClient.post<Jwt>("/auth/login", payload);
    };

    /**
     * Executes a register request to the server.
     * @param email - The user's email.
     * @param password - The user's password.
     * @returns Promise<AxiosResponse<User>> - A promise that resolves into a User.
     */
    public register = (email: string, password: string): Promise<AxiosResponse<User>> => {
        const payload = this.#createUserPayload(email, password);
        return this.httpClient.post<User>("/auth/register", payload);
    };
}
export default new AuthAPI();
