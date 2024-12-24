import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {

    const _auth = inject(AuthenticateService);
    const _router = inject(Router);

    return _auth.$isLoggedIn.pipe(
        map((isLoggedIn: boolean) => {
            const { url } = state;
            //console.log('isLoggedIn', isLoggedIn);
            if (isLoggedIn) {
                if (url === '/login' || url === '/register') {
                    return _router.createUrlTree(['control-panel/dashboard']);
                } else {
                    return true;
                }
            } else {
                if (url === '/login' || url === '/register') {
                    return true;
                } else {
                    return _router.createUrlTree(['/login']);
                }
            }
        }),
    );
};


