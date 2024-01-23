interface Feed {
    uuid: string;
    feedUrl: string;
    entries?: Entry[]; // Entry needs to be defined
    title: string;
    description?: string;
    link: string;
    author?: string;
    pubDate?: Date;
    users?: User[]; // assuming User is another interface
}
