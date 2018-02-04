import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClienteContacto } from '../../models/clientContact.model';
import { ContactType } from '../../models/contact_type.model';

@Component({
  selector: 'client-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  @Input('client')
  _client: Client;

  @Input('contactTypes')
  _contactTypes: ContactType[];

  @Output()
  clientSaved:EventEmitter<Client> = new EventEmitter<Client>();

  addContactRow(){
    let newContact:ClienteContacto = new ClienteContacto;
    newContact.idTipoContacto=1;
    this._client.clientesContactos.push(newContact);
  }
  saveClient(){
    this.clientSaved.emit(this._client);
  }

}