import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

function isLoggedIn(platformId: object) {
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return !!localStorage.getItem('accessToken');
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isLoggedIn(platformId)) {
    return true;
  }

  return router.createUrlTree(['/sign-in']);
};

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isLoggedIn(platformId)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
