import type {AxiosResponse} from "axios";
import type Entry from "@/models/Entry";
import type PageableResponse from "@/models/PageableResponse";
import APIBase from "@/api/APIBase";

class SearchAPI extends APIBase {

    /**
     * Retrieves entries from the server based on the given query.
     *
     * @param {string} query - The query to filter the entries.
     * @param {number} [size=50] - The number of entries to retrieve per page (default: 50).
     * @param {number} [page=0] - The page number to retrieve (default: 0).
     * @param {boolean} [sortOrder=false] - The sort order of the entries (default: false).
     * @returns {Promise} - A Promise that resolves to an AxiosResponse containing a PageableResponse of Entry objects.
     */
    public getEntriesByQuery = (query: string, size: number = 50, page: number = 0, sortOrder: boolean = false): Promise<AxiosResponse<PageableResponse<Entry>>> => {
        return this.httpClient.get<PageableResponse<Entry>>("/search/entries", {
            params: {
                "searchString": query,
                "size": size,
                "page": page,
                "sortOrder": sortOrder,
            }
        });
    }
}


export default new SearchAPI();

