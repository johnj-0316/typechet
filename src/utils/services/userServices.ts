import { hash, verify } from 'argon2';

import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { userProfiles, users } from '../../db/schema';

import { APIError } from '../errors/Error';
import {
    CleanUser,
    CreateUserParams,
    EditUserProfileParams,
    FindUserByEmailParams,
    FindUserByIdParams,
    FindUserProfileByIdParams,
    User,
    UserProfile,
    VerifyCredentialsParams,
} from './userServices.types';

export { findUserById, findUserProfileById, editUserProfile, verifyCredentials, createUser };

async function findUserByEmail({ email }: FindUserByEmailParams) {
    const cleanMail = email.trim().toLowerCase();
    const [user] = await db.select().from(users).where(eq(users.email, cleanMail)).limit(1);
    return user;
}

async function findUserById({ uid }: FindUserByIdParams) {
    const [user] = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return user ? cleanUser(user) : undefined;
}

async function findUserProfileById({ uid }: FindUserProfileByIdParams) {
    const [user] = await db.select().from(userProfiles).where(eq(userProfiles.id, uid)).limit(1);
    return user;
}

async function editUserProfile({
    id,
    name,
    displayName,
    profileUrl,
    phone,
}: EditUserProfileParams): Promise<UserProfile> {
    const [profile] = await db
        .update(userProfiles)
        .set({
            name,
            displayName,
            profileUrl,
            phone,
        })
        .where(eq(userProfiles.id, id))
        .returning();

    if (!profile) throw new APIError('Profile was not found!', 404);

    return profile;
}

async function verifyCredentials({ email, password }: VerifyCredentialsParams) {
    const user = await findUserByEmail({ email });

    // check if user exists by email and password matches hash in db.
    if (!user || !user.hashedPassword || !(await verify(user.hashedPassword, password)))
        return null;

    return cleanUser(user);
}

async function createUser({ username, email, password }: CreateUserParams) {
    const cleanName = username.trim();
    const cleanMail = email.toLowerCase().trim();
    const hashedPassword = await hash(password);

    return db.transaction(async (tx) => {
        const [user] = await tx
            .insert(users)
            .values({
                email: cleanMail,
                hashedPassword,
            })
            .returning();

        await tx.insert(userProfiles).values({
            id: user.uid,
            name: cleanName,
        });

        return cleanUser(user);
    });
}

function cleanUser(user: User): CleanUser {
    const { hashedPassword, ...cleanUser } = user;
    return cleanUser;
}
