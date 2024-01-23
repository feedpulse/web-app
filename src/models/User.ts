interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    roles?: Role[];
    feeds?: Feed[];
    userEntryInteractions?: UserEntryInteraction[];
}
