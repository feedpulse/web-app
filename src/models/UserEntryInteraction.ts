interface UserEntryInteraction {
    id: number;
    user: User;    // Assuming User is a converted interface
    entry: Entry;  // Assuming Entry is a converted interface
    read: boolean;
    favorite: boolean;
    bookmark: boolean;
}
