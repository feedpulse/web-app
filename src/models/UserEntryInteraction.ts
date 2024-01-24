import type Entry from "@/models/Entry";
import type User from "@/models/User";

interface UserEntryInteraction {
    id: number;
    user: User;    // Assuming User is a converted interface
    entry: Entry;  // Assuming Entry is a converted interface
    read: boolean;
    favorite: boolean;
    bookmark: boolean;
}
