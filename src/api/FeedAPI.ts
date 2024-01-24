import axios from "axios";
import type {AxiosResponse} from "axios";
import type Entry from "@/models/Entry";
import type Feed from "@/models/Feed";

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
 * Retrieves a list of feeds from the server.
 *
 * @param {string} bearer - The bearer token used for authentication.
 * @param {number} [limit=20] - The maximum number of feeds to retrieve (default: 20).
 * @param {number} [offset=0] - The offset from which to start retrieving feeds (default: 0).
 * @param {boolean} [sortOrder=false] - The sort order of the feeds (default: false).
 * @returns {Promise<AxiosResponse<Feed[]>>} - A Promise that resolves to the response from the server containing an array of feeds.
 */
const getFeeds = (bearer: string, limit: number = 20, offset: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<Feed[]>> => {
    return httpClient.get<Feed[]>("/feeds", {
        headers: getAuthHeaders(bearer),
        params: {
            "limit": limit,
            "offset": offset,
            "sortOrder": sortOrder,
        }
    });
}

/**
 * Fetches a feed using the provided bearer token and UUID.
 *
 * @param {string} bearer - The bearer token used for authentication.
 * @param {string} uuid - The UUID of the feed to fetch.
 * @returns {Promise<AxiosResponse<Feed>>} - A promise that resolves to the AxiosResponse containing the fetched feed.
 *
 * @throws {AxiosError} - If an error occurs while making the request.
 */
const getFeed = (bearer: string, uuid: string): Promise<AxiosResponse<Feed>> => {
    return httpClient.get<Feed>(`/feeds/${uuid}`, {
        headers: getAuthHeaders(bearer),
    });
}

/**
 * Retrieves feed entries from the server.
 *
 * @param {string} bearer - The bearer token for authorization.
 * @param {string} uuid - The UUID of the feed.
 * @param {number} [limit=20] - The maximum number of entries to retrieve. Defaults to 20.
 * @param {number} [offset=0] - The number of entries to skip before retrieving. Defaults to 0.
 * @param {boolean} [sortOrder=false] - The sorting order of the entries. Defaults to false which is ascending order.
 * @returns {Promise<AxiosResponse<Entry[]>>} - A promise that resolves with the Axios response containing the array of entries.
 */
const getFeedEntries = (bearer: string, uuid: string, limit: number = 20, offset: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<Entry[]>> => {
    return httpClient.get<Entry[]>(`/feeds/${uuid}/entries`, {
        headers: getAuthHeaders(bearer),
        params: {
            "limit": limit,
            "offset": offset,
            "sortOrder": sortOrder,
        }
    });
}

/**
 * Adds a new feed to the system.
 *
 * @async
 * @param {string} bearer - The bearer token for authorization.
 * @param {string} feedUrl - The URL of the feed to be added.
 * @returns {Promise} A promise that resolves to the Axios response object containing the added feed.
 */
const addFeed = (bearer: string, feedUrl: string): Promise<AxiosResponse<Feed>> => {
    return httpClient.post<Feed>("/feeds", {}, {
        headers: getAuthHeaders(bearer),
        params: {
            "feedUrl": feedUrl,
        }
    });
}

/**
 * Removes a feed from the system.
 *
 * @async
 * @param {string} bearer - The bearer token for authorization.
 * @param {string} uuid - The UUID of the feed to be removed.
 * @returns {Promise} A promise that resolves to the Axios response object.
 */
const removeFeed = (bearer: string, uuid: string): Promise<AxiosResponse> => {
    return httpClient.delete(`/feeds/${uuid}`, {
        headers: getAuthHeaders(bearer),
    });
}

export const FeedAPI = {
    getFeeds,
    getFeed,
    getFeedEntries,
    addFeed,
    removeFeed,
}
