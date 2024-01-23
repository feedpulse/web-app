import axios from "axios";
import type {AxiosResponse} from "axios";

const httpClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Returns the authorization headers for the API request.
 *
 * @param {string} token - The access token to include in the authorization header.
 * @return {Object} - The authorization headers object.
 */
const getAuthHeaders = (token: string) => {
    return {
        Authorization: `Bearer ${token}`
    };
};

/**
 * Retrieves the logged-in user information.
 *
 * @param {string} bearer - The bearer token for authentication.
 * @returns {Promise<AxiosResponse<User>>} - A promise that resolves with the Axios response containing user information.
 */
const getLoggedInUser = (bearer: string): Promise<AxiosResponse<User>> => {
    return httpClient.get<User>("/users/me", {
        headers: getAuthHeaders(bearer),
    });
};

/**
 * Updates the logged-in user's information.
 *
 * @param {string} bearer - The bearer token for authentication.
 * @param {string} email - The new email for the user.
 * @param {string} password - The current password of the user.
 * @param {string} newPassword - The new password for the user.
 * @param {string[]} roles - The new roles for the user.
 * @returns {Promise<AxiosResponse<User>>} - A promise that resolves to the updated user response.
 */
const updateLoggedInUser = (bearer: string, email: string, password: string, newPassword: string, roles: string[]): Promise<AxiosResponse<User>> => {
    return httpClient.put<User>("/users/me", {
        "email": email,
        "password": password,
        "newPassword": newPassword,
        "roles": roles,
    }, {
        headers: getAuthHeaders(bearer),
    });
}

/**
 * Retrieves user information using the provided bearer token and UUID.
 *
 * @param {string} bearer - The bearer token used for authentication.
 * @param {string} uuid - The UUID of the user to retrieve.
 * @returns {Promise<AxiosResponse<User>>} A Promise that resolves to the AxiosResponse containing the user information.
 */
const getUser = (bearer: string, uuid: string): Promise<AxiosResponse<User>> => {
    return httpClient.get<User>(`/users/${uuid}`, {
        headers: getAuthHeaders(bearer),
    });
}

/**
 * Updates a user's information.
 *
 * @param {string} bearer - The bearer token used for authentication.
 * @param {string} uuid - The UUID of the user to be updated.
 * @param {string} email - The new email of the user.
 * @param {string} password - The current password of the user.
 * @param {string} newPassword - The new password of the user.
 * @param {string[]} roles - The new roles of the user.
 * @returns {Promise<AxiosResponse<User>>} - A promise that resolves to the updated user object.
 */
const updateUser = (bearer: string, uuid: string, email: string, password: string, newPassword: string, roles: string[]): Promise<AxiosResponse<User>> => {
    return httpClient.put<User>(`/users/${uuid}`, {
        "email": email,
        "password": password,
        "newPassword": newPassword,
        "roles": roles,
    }, {
        headers: getAuthHeaders(bearer),
    });
}

export const UserAPI = {
    getLoggedInUser,
    updateLoggedInUser,
    getUser,
    updateUser,
}
