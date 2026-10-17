import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../shared/types/api.types';

@Service()
export class AuthService {
    readonly client = inject(HttpClient);

    getCurrentUser() {
        return this.client.get<Profile>(
            "/api/v1/auth/profile",
        );
    }
}
