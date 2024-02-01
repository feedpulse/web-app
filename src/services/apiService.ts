import {type AxiosInstance} from "axios";
import EntryAPI from "@/api/EntryAPI";
import UserAPI from "@/api/UserAPI";
import FeedAPI from "@/api/FeedAPI";
import AuthAPI from "@/api/AuthAPI";

class ApiService {

    private bearer: (string | null) = null;
    private unauthorizedCallback: (() => void) | null = null;
    private unauthenticatedCallback: (() => void) | null = null;
    private networkErrorCallback: (() => void) | null = null;

    public EntryAPI = EntryAPI
    public UserAPI = UserAPI
    public FeedAPI = FeedAPI
    public AuthAPI = AuthAPI
    private apiList = [EntryAPI, UserAPI, FeedAPI, AuthAPI]

    constructor() {
        this.apiList.forEach((api) => {
            this.addInterceptor(api.httpClient)
        })
    }

    private addInterceptor(httpClient: AxiosInstance) {
        httpClient.interceptors.request.use((config) => {
            console.log(config)
            if (this.bearer) {
                // Add the bearer token to the request headers.
                config.headers["Authorization"] = `Bearer ${this.bearer}`;
            }
            return config;
        }, (error) => {
            alert("An error occurred while sending the request.")
            console.log(error)
            return Promise.reject(error);
        });

        // Add a response interceptor to the HTTP client to handle unauthorized errors.
        httpClient.interceptors.response.use((response) => {
            const token = response.headers["Authorization"];
            if (token) {
                const tokenParts = token.split(" ");
                if (tokenParts.length === 2) {
                    this.setBearer(tokenParts[1]);
                }
            }
            return response;
        }, (error) => {
            if (!error.status) {
                // Network error.
                if (this.networkErrorCallback) {
                    this.networkErrorCallback();
                }
            } else if (error.response.status === 401) {
                if (this.unauthenticatedCallback) {
                    this.unauthenticatedCallback();
                }
                this.setBearer(null);
            } else if (error.response.status === 403) {
                if (this.unauthorizedCallback) {
                    this.unauthorizedCallback();
                }
            }
            console.log(error);
            return Promise.reject(error);
        });
    }


    setBearer(bearer: (string | null)) {
        this.bearer = bearer;
    }

    getBearer() {
        return this.bearer;
    }

    setUnauthorizedCallback(callback: () => void) {
        this.unauthorizedCallback = callback;
    }

    setUnauthenticatedCallback(callback: () => void) {
        this.unauthenticatedCallback = callback;
    }

    setNetworkErrorCallback(callback: () => void) {
        this.networkErrorCallback = callback;
    }
}

export default new ApiService();
