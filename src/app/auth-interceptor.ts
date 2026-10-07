import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getAccessToken();

    if (!token || !req.url.startsWith('/api/')) {
        return next(req);
    }

    const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`),
    });

    return next(authReq);
};
