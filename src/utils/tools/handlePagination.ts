import { ClientError } from "../errors/Error";

// pages are 1 indexed
export function handlePagination(
    pageQuery: string | void, 
    limitQuery: string | void = "10"
): {
    offset: number,
    limit: number
} {
    const limit = Math.round(+limitQuery);

    if (limit <= 0 || limit > 100)
        throw new ClientError("Invalid limit query.", 400);

    // default value on no page specified
    if (!pageQuery) {
        return {
            offset: 0,
            limit
        };
    }

    const offset = limit * (Math.round(+pageQuery) - 1);

    if (offset < 0)
        throw new ClientError("Invalid page query.", 400);

    return { offset, limit };
}