import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClientService } from '../../services/clients.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../../models/client.model';
import { ContactType } from '../../models/contact_type.model';
import { ContactTypeService } from '../../services/contact_types.service';
import { ClientManager } from '../generics/client.manager';
import { ModelManager } from '../generics/model.imanager';
import { FileUploaderService } from '../../services/fileuploader.service';
import { AppCustomEvent } from '../../appcustomevents';
import { Broadcaster } from '../../services/broadcaster.service';
import { ToastMessage, ToastType } from '../../models/toastMessage.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  providers: [ClientService, ContactTypeService, FileUploaderService]
})
export class ClientDetailComponent extends ClientManager implements OnInit, ModelManager {

  @ViewChild('profilePhotoInput') profilePhotoInput: ElementRef;

  pickPhoto() {
    this.profilePhotoInput.nativeElement.click();
  }
  deleteHandler(event: Client) {
    let ctx = this;
    let router: Router = this.router;
    this._clientService.deleteClient(event).subscribe(function (response) {
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
    this.getSavedMethod(event).subscribe(function (response) {
      ctx.router.navigateByUrl('clients');
      ctx.broadcaster.broadcast(AppCustomEvent.toast, new ToastMessage("Cliente guardado correctamente.", ToastType.Ok));
    }, function () {
      ctx.broadcaster.broadcast(AppCustomEvent.toast,
        new ToastMessage("No pudimos guardar el cliente.", ToastType.Error));
    });
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    _clientService: ClientService,
    _contactTypesService: ContactTypeService,
    private _fileUploader: FileUploaderService,
    private broadcaster: Broadcaster
  ) {
    super(_clientService, _contactTypesService);
  }

  ngOnInit() {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this._contactTypesService.getTypes().subscribe(response => this._contactTypes = response);
    if (id) {
      this._clientService.getClient(id).subscribe(response => this._client = response);
    }
  }
}
