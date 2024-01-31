// APIBase.ts
import axios, {type AxiosInstance} from "axios";

/**
 * APIBase is a base class for API classes.
 *
 * @class
 */
class APIBase {
    public readonly httpClient: AxiosInstance;

    constructor() {

        // Create an HTTP client with the base URL set to the backend URL.
        this.httpClient = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

    }
}

export default APIBase;
