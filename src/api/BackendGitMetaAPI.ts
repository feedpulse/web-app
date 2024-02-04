import type {AxiosResponse} from "axios";
import APIBase from "@/api/APIBase";
import type BackendGitMetaProperties from "@/models/BackendGitMetaProperties";

class BackendGitMetaAPI extends APIBase {

    public getProperties = (): Promise<AxiosResponse<BackendGitMetaProperties>> => {
        return this.httpClient.get<BackendGitMetaProperties>('/meta/git/properties');
    }

}

export default new BackendGitMetaAPI();

