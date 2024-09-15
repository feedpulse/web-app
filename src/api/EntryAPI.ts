import type {AxiosResponse} from "axios";
import type Entry from "@/models/Entry";
import type PageableResponse from "@/models/PageableResponse";
import APIBase from "@/api/APIBase";

class EntryAPI extends APIBase {

    /**
     * Retrieves a list of entries from the server.
     * @param {boolean} onlyUnreadEntries - Whether to retrieve only unread entries.
     * @param {number} [size=50] - The maximum number of entries to retrieve. Defaults to 20.
     * @param {number} [page=0] - The number of entries to skip before retrieving. Defaults to 0.
     * @param {boolean} [sortOrder=false] - The order in which the entries should be sorted. Defaults to false (ascending order).
     * @returns {Promise<AxiosResponse<Entry[]>>} - A promise that resolves to the HTTP response containing the list of entries.
     */
    public getEntries = (onlyUnreadEntries: boolean = false, size: number = 50, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
        return this.httpClient.get<PageableResponse<Entry>>("/entries", {
            params: {
                "size": size,
                "page": page,
                "sortOrder": sortOrder,
                "onlyUnread": onlyUnreadEntries,
            }
        });
    }

    public getEntriesByUrl = (url: string): Promise<AxiosResponse<PageableResponse<Entry>>> => {
        return this.httpClient.get<PageableResponse<Entry>>(url);
    }

    /**
     * Retrieves a specific entry using the given UUID.
     *
     * @param {string} uuid - The UUID of the entry to retrieve.
     * @returns {Promise<AxiosResponse<Entry>>} A Promise that resolves to the Axios response containing the entry.
     */
    public getEntry = (uuid: string): Promise<AxiosResponse<Entry>> => {
        return this.httpClient.get<Entry>(`/entries/${uuid}`);
    }

    /**
     * Update an entry.
     *
     * @async
     * @param {string} uuid - The UUID of the entry to be updated.
     * @param {boolean} read - Indicates whether the entry has been read.
     * @param {boolean} favorite - Indicates whether the entry is marked as favorite.
     * @param {boolean} bookmark - Indicates whether the entry is bookmarked.
     * @returns {Promise<AxiosResponse>} - A promise that resolves to the Axios response object.
     */
    public updateEntry = (uuid: string, read: (boolean | null), favorite: (boolean | null), bookmark: (boolean | null)): Promise<AxiosResponse> => {
        return this.httpClient.put(`/entries/${uuid}`, {
            "uuid": uuid,
            "read": read,
            "favorite": favorite,
            "bookmark": bookmark,
        });
    }

    public readEntries(entries: Set<Entry>): Promise<AxiosResponse> {
        return this.httpClient.put("/entries/read", {
            ["entries"]: [...entries].map((entry) => entry.uuid),
        });
    }

    public getFavoriteEntries = (size: number = 50, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
        return this.httpClient.get<PageableResponse<Entry>>("/entries/favorites", {
            params: {
                "size": size,
                "page": page,
                "sortOrder": sortOrder,
            }
        });
    }

    public getBookmarkedEntries = (size: number = 50, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
        return this.httpClient.get<PageableResponse<Entry>>("/entries/bookmarks", {
            params: {
                "size": size,
                "page": page,
                "sortOrder": sortOrder,
            }
        });
    }

}

export default new EntryAPI();

