import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class UserService {
    private readonly httpUser = inject(HttpClient);

    signin(email: string, password: string) {
        return this.httpUser.post('/api/v1/auth/login', {
            email,
            password
        });
    }

    signup(username: string, email: string, password: string) {
        return this.httpUser.post('/api/v1/auth/register', {
            username,
            email,
            password
        });
    }

    signout() {
        return this.httpUser.post('/api/v1/auth/logout', {});
    }
}
