import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Broadcaster } from './services/broadcaster.service';
import { AppCustomEvent } from './appcustomevents';
import { ToastsManager } from 'ng2-toastr';
import { ToastMessage, ToastType } from './models/toastMessage.model';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AuthenticationSandbox } from './security/sandbox/authentication.sandbox';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'app';
  user:any;
  
  constructor(private broadcaster: Broadcaster,
    private authSandbox: AuthenticationSandbox,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    angulartics2GoogleAnalytics: Angulartics2GoogleTagManager,
    public loader: LoadingBarService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.broadcaster.on<ToastMessage>(AppCustomEvent.toast)
      .subscribe(message => {
        console.log(message);
        switch (message.type) {
          case ToastType.Error:
            this.toastr.error(message.messageText, 'Lo sentimos.');
            break;
          default:
            this.toastr.success(message.messageText, 'Exito!');
            break;
        }
      });
  }

  ngOnInit() {
    this.user = this.authSandbox.getUser();
  }
}
