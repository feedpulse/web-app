export default interface PageableResponse<T> {
    content: T[];
    page: number
    size: number;
    totalPages: number;
    totalElements: number;
    links: {
        first: string;
        last: string;
        next: string;
        self: string;
    }
}
