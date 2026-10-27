import { userProfiles, users } from '../../db/schema';

export type User = typeof users.$inferSelect;
export type CleanUser = Omit<User, 'hashedPassword'>;
export type UserProfile = typeof userProfiles.$inferSelect;

export type FindUserByEmailParams = { email: string };
export type FindUserByIdParams = { uid: string };
export type FindUserProfileByIdParams = FindUserByIdParams;

export type EditUserProfileParams = {
    id: string;
    name: string;
    displayName: string;
    profileUrl?: string;
    phone?: string;
};

export type VerifyCredentialsParams = {
    email: string;
    password: string;
};

export type CreateUserParams = {
    username: string;
    email: string;
    password: string;
};
