import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { ApiUserResponse, Profile } from '../shared/types/api.types';

export type UserProfileResponse = ApiUserResponse<Profile>;

@Service()
export class ProfileService {
    private readonly httpProfile = inject(HttpClient);

    getUserProfile() {
        return this.httpProfile.get<UserProfileResponse>('/api/v1/auth/profile');
    }

    editUserProfile(profile: Partial<Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>>) {
        return this.httpProfile.put<UserProfileResponse>('/api/v1/auth/profile', profile);
    }
}
