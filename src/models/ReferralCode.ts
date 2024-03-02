export default interface ReferralCode {
    code: string;
    dateCreated: Date;
    dateExpired: Date;
    dateUsed: Date | null;
    isUsed: boolean;
}
