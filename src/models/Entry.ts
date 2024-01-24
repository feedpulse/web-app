import type Feed from "@/models/Feed";
import type Keyword from "@/models/Keyword";

export default interface Entry {
    uuid: string;
    feed: Feed; // Feed needs to be defined
    title: string;
    description?: string;
    text?: string;
    link: string;
    author?: string;
    imageUrl?: string;
    language?: string;
    pubDate?: Date;
    read?: boolean;
    favorite?: boolean;
    bookmark?: boolean;
    // userEntryInteractions?: UserEntryInteraction; // UserEntryInteraction needs to be defined
    keywords: Keyword[]; // Keyword needs to be defined
}
