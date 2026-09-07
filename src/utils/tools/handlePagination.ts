// pages are 1 indexed
export function handlePagination(
    pageQuery: string | void, 
    limitQuery: string | void = "10"
): {
    offset: number,
    limit: number
} {
    const limit = Math.round(+limitQuery);

    // default value on no page specified
    if (!pageQuery) {
        return {
            offset: 0,
            limit
        };
    }

    const offset = limit * (Math.round(+pageQuery) - 1);

    if (offset < 0)
        throw new Error("Invalid page query");

    if (limit <= 0 || limit > 50)
        throw new Error("Invalid limit query");

    return { offset, limit };
}