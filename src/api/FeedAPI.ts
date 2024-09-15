import axios from "axios";
import type {AxiosResponse} from "axios";
import type Entry from "@/models/Entry";
import type Feed from "@/models/Feed";
import type PageableResponse from "@/models/PageableResponse";
import APIBase from "@/api/APIBase";

class FeedAPI extends APIBase {

    /**
     * Retrieves a list of feeds from the server.
     *
     * @param {number} [size=20] - The maximum number of feeds to retrieve (default: 20).
     * @param {number} [page=0] - The offset from which to start retrieving feeds (default: 0).
     * @param {boolean} [sortOrder=false] - The sort order of the feeds (default: false).
     * @returns {Promise<AxiosResponse<PageableResponse<Feed>>>} - A Promise that resolves to the response from the server containing an array of feeds.
     */
    public getFeeds = (size: number = 20, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Feed>>> => {
        return this.httpClient.get<PageableResponse<Feed>>("/feeds", {
            params: {
                "size": size,
                "page": page,
                "sortOrder": sortOrder,
            }
        });
    }

    /**
     * Fetches a feed using the provided bearer token and UUID.
     *
     * @param {string} uuid - The UUID of the feed to fetch.
     * @returns {Promise<AxiosResponse<Feed>>} - A promise that resolves to the AxiosResponse containing the fetched feed.
     *
     * @throws {AxiosError} - If an error occurs while making the request.
     */
    public getFeed = (uuid: string): Promise<AxiosResponse<Feed>> => {
        return this.httpClient.get<Feed>(`/feeds/${uuid}`);
    }

    /**
     * Marks all entries of a feed as read.
     *
     * @param {string} uuid - The UUID of the feed to mark as read.
     * @returns {Promise<AxiosResponse>} - A promise that resolves to the Axios response object.
     */
    public markFeedAsRead = (uuid: string): Promise<AxiosResponse> => {
        return this.httpClient.patch(`/feeds/${uuid}/read`);
    }

    /**
     * Retrieves feed entries from the server.
     *
     * @param {string} uuid - The UUID of the feed.
     * @param {boolean} onlyUnreadEntries - Whether to retrieve only unread entries.
     * @param {number} [size=20] - The maximum number of entries to retrieve. Defaults to 20.
     * @param {number} [page=0] - The number of entries to skip before retrieving. Defaults to 0.
     * @param {boolean} [sortOrder=false] - The sorting order of the entries. Defaults to false which is ascending order.
     * @returns {Promise<AxiosResponse<PageableResponse<Entry>>>} - A promise that resolves with the Axios response containing the array of entries.
     */
    public getFeedEntries = (uuid: string, onlyUnreadEntries: boolean, size: number = 20, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
        return this.httpClient.get<PageableResponse<Entry>>(`/feeds/${uuid}/entries`, {
            params: {
                "size": size,
                "page": page,
                "sortOrder": sortOrder,
                "onlyUnread": onlyUnreadEntries,
            }
        });
    }

    /**
     * Adds a new feed to the system.
     *
     * @async
     * @param {string} feedUrl - The URL of the feed to be added.
     * @returns {Promise} A promise that resolves to the Axios response object containing the added feed.
     */
    public addFeed = (feedUrl: string): Promise<AxiosResponse<Feed>> => {
        return this.httpClient.post<Feed>("/feeds", {}, {
            params: {
                "feedUrl": feedUrl,
            }
        });
    }

    /**
     * Removes a feed from the system.
     *
     * @async
     * @param {string} uuid - The UUID of the feed to be removed.
     * @returns {Promise} A promise that resolves to the Axios response object.
     */
    public removeFeed = (uuid: string): Promise<AxiosResponse> => {
        return this.httpClient.delete(`/feeds/${uuid}`);
    }

    public validateFeedUrl = (feedUrl: string): Promise<AxiosResponse> => {
        return this.httpClient.get(`/feeds/validate-feed-url`, {
            params: {
                "feedUrl": feedUrl,
            }
        });
    }

}
export default new FeedAPI();
