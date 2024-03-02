import axios from "axios";
import type {AxiosResponse} from "axios";
import type User from "@/models/User";
import APIBase from "@/api/APIBase";
import type PageableResponse from "@/models/PageableResponse";

class UserAPI extends APIBase {

    /**
     * Retrieves the logged-in user information.
     *
     * @returns {Promise<AxiosResponse<User>>} - A promise that resolves with the Axios response containing user information.
     */
    public getLoggedInUser = (): Promise<AxiosResponse<User>> => {
        return this.httpClient.get<User>("/users/me");
    };

    /**
     * Updates the logged-in user's information.
     *
     * @param {string} email - The new email for the user.
     * @param {string} password - The current password of the user.
     * @param {string} newPassword - The new password for the user.
     * @param {string[]} roles - The new roles for the user.
     * @returns {Promise<AxiosResponse<User>>} - A promise that resolves to the updated user response.
     */
    public updateLoggedInUser = (email: string, password: string, newPassword: string, roles: string[]): Promise<AxiosResponse<User>> => {
        return this.httpClient.put<User>("/users/me", {
            "email": email,
            "password": password,
            "newPassword": newPassword,
            "roles": roles,
        });
    }

    /**
     * Retrieves user information using the provided bearer token and UUID.
     *
     * @param {string} uuid - The UUID of the user to retrieve.
     * @returns {Promise<AxiosResponse<User>>} A Promise that resolves to the AxiosResponse containing the user information.
     */
    public getUser = (uuid: string): Promise<AxiosResponse<User>> => {
        return this.httpClient.get<User>(`/users/${uuid}`);
    }

    /**
     * Updates a user's information.
     *
     * @param {string} uuid - The UUID of the user to be updated.
     * @param {string} email - The new email of the user.
     * @param {string} password - The current password of the user.
     * @param {string} newPassword - The new password of the user.
     * @param {string[]} roles - The new roles of the user.
     * @param {boolean} isEnabled - Whether the user is enabled or not.
     * @returns {Promise<AxiosResponse<User>>} - A promise that resolves to the updated user object.
     */
    public updateUser = (uuid: number, email: string | null, password: string | null, newPassword: string | null, roles: string[] | null, isEnabled: boolean | null): Promise<AxiosResponse<User>> => {
        return this.httpClient.put<User>(`/users/${uuid}`, {
            "email": email,
            "password": password,
            "newPassword": newPassword,
            "roles": roles,
            "isUserEnabled": isEnabled
        });
    }


    public enableUser = (uuid: string, isEnabled: boolean | null): Promise<AxiosResponse<User>> => {
        return this.httpClient.post<User>(`/users/${uuid}/enable?enable=${isEnabled}`);
    }

    public getUsers = (): Promise<AxiosResponse<PageableResponse<User[]>>> => {
        return this.httpClient.get("/users");
    }

    public getUsersWithFilter = (email: string | null, enabled: boolean | null): Promise<AxiosResponse<PageableResponse<User>>> => {
        return this.httpClient.get<PageableResponse<User>>("/users/filtered", {
            params: {
                email: email,
                isEnabled: enabled
            }
        });
    }
}

export default new UserAPI();
