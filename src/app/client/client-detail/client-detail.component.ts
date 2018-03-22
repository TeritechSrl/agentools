import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClientService } from '../../services/clients.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../../models/client.model';
import { ContactType } from '../../models/contact_type.model';
import { ContactTypeService } from '../../services/contact_types.service';
import { ClientManager } from '../generics/client.manager';
import { ModelManager } from '../generics/model.imanager';
import { FileManagerService } from '../../services/filemanager.service';
import { AppCustomEvent } from '../../appcustomevents';
import { Broadcaster } from '../../services/broadcaster.service';
import { ToastMessage, ToastType } from '../../models/toastMessage.model';
import { ClienteContacto } from '../../models/clientContact.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  providers: [ClientService, ContactTypeService, FileManagerService]
})
export class ClientDetailComponent extends ClientManager implements OnInit, ModelManager {
 
  deleteHandler(event: Client) {
    let ctx = this;
    let router: Router = this.router;
    this._clientService.delete(event.id).subscribe(function (response) {
      ctx.broadcaster.broadcast(AppCustomEvent.toast,
        new ToastMessage("Cliente eliminado.", ToastType.Ok));
      ctx.router.navigateByUrl('clients');
    }, function () {
      ctx.broadcaster.broadcast(AppCustomEvent.toast,
        new ToastMessage("No pudimos eliminar el cliente.", ToastType.Error));
    });
  }
  _client: Client;
  _contactTypes: ContactType[];
  saveImage(event: any, id: number): void {
    let ctx = this;
    this._fileUploader.avatarChange(event, id).subscribe(function (data) {
      ctx._client.avatar = data;
      ctx.broadcaster.broadcast(AppCustomEvent.toast,
        new ToastMessage("Imagen cambiada.", ToastType.Ok));
    }, function () {
      ctx.broadcaster.broadcast(AppCustomEvent.toast,
        new ToastMessage("No pudimos cambiar la imagen.", ToastType.Error));
    });
  }
  saveHandler(event: any) {
    let ctx = this;
    console.log(event);
    
    this.getSavedMethod(event).subscribe(function (response) {
      ctx.router.navigateByUrl('clients');
      ctx.broadcaster.broadcast(AppCustomEvent.toast, new ToastMessage("Cliente guardado correctamente.", ToastType.Ok));
    }, function (error) {
      ctx.broadcaster.broadcast(AppCustomEvent.toast,
        new ToastMessage("No pudimos guardar el cliente. "+ error.error, ToastType.Error));
    });
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    _clientService: ClientService,
    _contactTypesService: ContactTypeService,
    private _fileUploader: FileManagerService,
    private broadcaster: Broadcaster
  ) {
    super(_clientService, _contactTypesService);
  }

  ngOnInit() {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this._contactTypesService.getTypes().subscribe(response => this._contactTypes = response);
    if (id) {
      this._clientService.get(id).subscribe(response => {
        this._client = response as Client;
        if (this._client.clientesContactos.length === 0) {
          this._client.clientesContactos.push(new ClienteContacto());
        }
        this._loaded = true;
      });
    }
  }
}
