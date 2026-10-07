import { inject, PLATFORM_ID, Service } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class AuthService {
    readonly platformId = inject(PLATFORM_ID);

    getAccessToken() {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }

        return localStorage.getItem('accessToken');
    }
}
