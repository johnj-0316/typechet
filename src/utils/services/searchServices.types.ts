export type SearchResult = {
    type: 'pattern' | 'tracker' | 'stitch';
    id: string;
    title: string;
    subtitle: string | null;
    updatedAt: Date;
};

export type SearchUserDataParams = {
    userId: string;
    searchTerm: string;
    limit: number;
};
