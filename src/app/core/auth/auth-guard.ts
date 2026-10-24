import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    //router automatically subscribes to observable
    //map will return observable<boolean> if user exists
    //catcherror runs on no user, redirect and replaceurl
    return authService.getCurrentUser().pipe(
        map(() => true),
        catchError(() =>
            of(new RedirectCommand(router.parseUrl('/sign-in'), { replaceUrl: true })),
        ),
    );
};

export const guestGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getCurrentUser().pipe(
        map(() => new RedirectCommand(router.parseUrl('/dashboard'), { replaceUrl: true })),
        catchError(() => of(true)),
    );
};
