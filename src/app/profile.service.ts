import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { Tables } from '../db/database.types';

type UserProfileResponse = {
    message: string;
    user: Tables<'user_profile'>;
};

@Service()
export class ProfileService {
    private readonly httpProfile = inject(HttpClient);

    getUserProfile() {
        return this.httpProfile.get<UserProfileResponse>('/api/v1/auth/profile');
    }
}
