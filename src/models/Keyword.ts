import type Entry from "@/models/Entry";

export default interface Keyword {
    id: number;
    keyword: string;
    entry?: Entry[]; // Assuming Entry is another interface
}
