import { Injectable } from '@angular/core';
import { MSALService } from '../service/msal.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthenticationSandbox {
    constructor(private authService: AuthService) {
    }

    public getToken(): string {
        return this.authService.getToken();
    }

    public login(): void {
        this.authService.login();
    }

    public getUser(): Observable<any> {
        let user: any = this.authService.getTokenDecoded();
        let shortName:string = '';
        let namedata = user.name.split(' ');
        
        for(var i = 0; i < namedata.length;i++){
            shortName+=namedata[i][0].toUpperCase();
        }

        user.shortName = shortName;
        return user;
    }
}
