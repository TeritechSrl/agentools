import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClienteContacto } from '../../models/clientContact.model';
import { ContactType } from '../../models/contact_type.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../generics/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'client-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  constructor(public dialog: MatDialog) {

  }
  
  clientForm: FormGroup;
  
  @Input('client')
  _client: Client;

  @Input('contactTypes')
  _contactTypes: ContactType[];

  @Output()
  clientSaved: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  clientDeleted: EventEmitter<Client> = new EventEmitter<Client>();

  @Input('isSaving')
  isSaving: boolean;

  addContactRow(): void {
    let newContact: ClienteContacto = new ClienteContacto;
    newContact.idTipoContacto = 1;
    this._client.clientesContactos.push(newContact);
  }
  saveClient(): void {
    console.log(this._client);
    this.clientSaved.emit(this._client);
    this.isSaving = true;
  }
  deleteClient(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        headerText: 'Eliminar cliente',
        question: '¿Está seguro que desea eliminar el cliente <b>' + this._client.nombreCompleto + '</b>?',
        additionalInfo: 'Esta acción no se puede deshacer. También se borrarán todos los archivos relacionados al cliente y sus pólizas.',
        okText: 'Eliminar',
        cancelText: 'Cancelar',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isSaving = true;
        this.clientDeleted.emit(this._client);
      }
    });
  }
}