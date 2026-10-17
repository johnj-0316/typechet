import { Request } from "express";

import { APIError } from "../../errors/Error";

export function sessionUser(
    req: Pick<Request, "user">,
): string {
    if (!req.user)
        throw new APIError("Missing authentication!", 401);

    return req.user.uid;
}
