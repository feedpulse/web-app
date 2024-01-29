import axios from "axios";
import type {AxiosResponse} from "axios";
import type Entry from "@/models/Entry";
import type PageableResponse from "@/models/PageableResponse";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
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
 * Retrieves a list of entries from the server.
 * @param {string} bearer - The bearer token for authorization.
 * @param {number} [limit=50] - The maximum number of entries to retrieve. Defaults to 20.
 * @param {number} [offset=0] - The number of entries to skip before retrieving. Defaults to 0.
 * @param {boolean} [sortOrder=false] - The order in which the entries should be sorted. Defaults to false (ascending order).
 * @returns {Promise<AxiosResponse<Entry[]>>} - A promise that resolves to the HTTP response containing the list of entries.
 */
const getEntries = (bearer: string, size: number = 50, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
    return httpClient.get<PageableResponse<Entry>>("/entries", {
        headers: getAuthHeaders(bearer),
        params: {
            "size": size,
            "page": page,
            "sortOrder": sortOrder,
        }
    });
}

/**
 * Retrieves a specific entry using the given UUID.
 *
 * @param {string} bearer - The bearer token used for authentication.
 * @param {string} uuid - The UUID of the entry to retrieve.
 * @returns {Promise<AxiosResponse<Entry>>} A Promise that resolves to the Axios response containing the entry.
 */
const getEntry = (bearer: string, uuid: string): Promise<AxiosResponse<Entry>> => {
    return httpClient.get<Entry>(`/entries/${uuid}`, {
        headers: getAuthHeaders(bearer),
    });
}

/**
 * Update an entry.
 *
 * @async
 * @param {string} bearer - The bearer token used for authentication.
 * @param {string} uuid - The UUID of the entry to be updated.
 * @param {boolean} read - Indicates whether the entry has been read.
 * @param {boolean} favorite - Indicates whether the entry is marked as favorite.
 * @param {boolean} bookmark - Indicates whether the entry is bookmarked.
 * @returns {Promise<AxiosResponse>} - A promise that resolves to the Axios response object.
 */
const updateEntry = (bearer: string, uuid: string, read: (boolean|null), favorite: (boolean|null), bookmark: (boolean|null)): Promise<AxiosResponse> => {
    return httpClient.put(`/entries/${uuid}`, {
        "uuid": uuid,
        "read": read,
        "favorite": favorite,
        "bookmark": bookmark,
    }, {
        headers: getAuthHeaders(bearer),
    });
}

const getFavoriteEntries = (bearer: string, size: number = 50, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
    return httpClient.get<PageableResponse<Entry>>("/entries/favorites", {
        headers: getAuthHeaders(bearer),
        params: {
            "size": size,
            "page": page,
            "sortOrder": sortOrder,
        }
    });
}

const getBookmarkedEntries = (bearer: string, size: number = 50, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
    return httpClient.get<PageableResponse<Entry>>("/entries/bookmarks", {
        headers: getAuthHeaders(bearer),
        params: {
            "size": size,
            "page": page,
            "sortOrder": sortOrder,
        }
    });
}

export const EntryAPI = {
    getEntries,
    getEntry,
    updateEntry,
    getFavoriteEntries,
    getBookmarkedEntries,
}
