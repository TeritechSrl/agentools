import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
  selector: 'client-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  @Input('client')
  private _client: Client;

  @Output()
  clientSaved:EventEmitter<Client> = new EventEmitter<Client>();

  saveClient(){
    this.clientSaved.emit(this._client);
  }

}