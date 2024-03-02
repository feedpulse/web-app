import type {AxiosResponse} from "axios";
import APIBase from "@/api/APIBase";
import type ReferralCode from "@/models/ReferralCode";

class AdminAPI extends APIBase {

    public getReferralCodes = (): Promise<AxiosResponse<ReferralCode[]>> => {
        return this.httpClient.get<ReferralCode[]>("/admin/referral-codes");
    }

    public generateReferralCode = (): Promise<AxiosResponse<ReferralCode>> => {
        return this.httpClient.post<ReferralCode>("admin/generate-referral-code");
    }

}

export default new AdminAPI();

