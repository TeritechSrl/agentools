import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }

  public get getAdalConfig(): any { 

    return { 
    
    tenant: 'teritechsrl.onmicrosoft.com', 
    
    clientId: '601608955454-h8bd51h24kaav519r0f5gkvmfm0h45qo.apps.googleusercontent.com', 
    
    redirectUri: window.location.origin + '/', 
    
    postLogoutRedirectUri: window.location.origin + '/' 
    
            }; 
    
        } 
    
    
}
