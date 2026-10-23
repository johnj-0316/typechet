import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { Profile } from '../shared/types/api.types';

export type UserProfileResponse = {
    message: string;
    user: Profile;
};

@Service()
export class ProfileService {
    private readonly httpProfile = inject(HttpClient);

    getUserProfile() {
        return this.httpProfile.get<UserProfileResponse>('/api/v1/auth/profile');
    }

    editUserProfile(name: string, displayName: string, profileUrl: string, phone: string) {
        return this.httpProfile.post<UserProfileResponse>('/api/v1/auth/profile', {
            name,
            displayName,
            profileUrl,
            phone
        });
    }
}
