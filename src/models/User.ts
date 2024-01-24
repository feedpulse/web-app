import type Role from "@/models/Role";
import type Feed from "@/models/Feed";

class UserEntryInteraction {
}

export default interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    roles?: Role[];
    feeds?: Feed[];
    userEntryInteractions?: UserEntryInteraction[];
}
