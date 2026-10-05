import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service } from '@angular/core';
import { Router } from '@angular/router';

import { Tables } from '../db/database.types';

type UserProfileResponse = {
  message: string;
  user: Tables<"user_profile">;
};


@Service()
export class ProfileService {
    readonly router = inject(Router);
    readonly platformId = inject(PLATFORM_ID);
    readonly httpProfile = inject(HttpClient);

    getUserProfile() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const token = localStorage.getItem("accessToken");

        if (!token) {
            return;
        }

        return this.httpProfile.get<UserProfileResponse>("/api/v1/auth/profile", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}
