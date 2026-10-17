import { Strategy } from "passport-local";

import { verifyCredentials } from "../../services/userServices";

export { verifyStrategy };

// jargon for ways to login :p
const verifyStrategy = new Strategy(
    { 
        usernameField: "email"
    },
    async (
        email: string,
        password: string,
        done
    ) => {
        try {
            const user = await verifyCredentials(email, password);

            if (!user) {
                return done(null, false, {
                    message: "Invalid credentials.",
                });
            }

            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }
)