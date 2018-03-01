import { Component, OnInit } from '@angular/core';
import { AuthenticationSandbox } from '../security/sandbox/authentication.sandbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  user:any;
  
  constructor(private authSandbox: AuthenticationSandbox) { 

  }

  ngOnInit() {
    this.user = this.authSandbox.getUser();
  }

}
