import type Entry from "@/models/Entry";
import type User from "@/models/User";

export default interface Feed {
    uuid: string;
    feedUrl: string;
    entries?: Entry[];
    unreadCount: number;
    title: string;
    description?: string;
    link: string;
    author?: string;
    pubDate?: Date;
    users?: User[];
}
