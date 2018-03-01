import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationSandbox } from './sandbox/authentication.sandbox';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    isAuthenticated: boolean;

    constructor(private authSandbox: AuthenticationSandbox, private router: Router) {
        this.isAuthenticated = false;
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const urlParams = new URLSearchParams(window.location.hash);
        // Setting token in session storage to prevent immediate multiple redirection to AAD login.
        if (urlParams.get('id_token') !== null && urlParams.get('id_token') !== undefined) {
            window.sessionStorage.setItem('msal.idtoken', urlParams.get('id_token'));
        }

        const token: string = this.authSandbox.getToken();
        this.isAuthenticated = token !== null && token !== undefined && token !== 'null';

        if (!this.isAuthenticated) {
            this.authSandbox.login();
        }

        return this.isAuthenticated;
    }
}
