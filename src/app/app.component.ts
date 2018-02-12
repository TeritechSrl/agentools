import { Component, ViewContainerRef } from '@angular/core';
import { Broadcaster } from './services/broadcaster.service';
import { AppCustomEvent } from './appcustomevents';
import { ToastsManager } from 'ng2-toastr';
import { ToastMessage, ToastType } from './models/toastMessage.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private broadcaster: Broadcaster,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.broadcaster.on<ToastMessage>(AppCustomEvent.toast)
      .subscribe(message => {
        console.log(message);
        switch (message.type) {
          case ToastType.Error:
            this.toastr.error(message.messageText, 'Lo sentimos.');
            break;
          default:
            this.toastr.success(message.messageText, 'Success!');
            break;
        }
      });
  }
}
