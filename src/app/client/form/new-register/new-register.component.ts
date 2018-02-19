import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ContactType } from '../../../models/contact_type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/clients.service';
import { ContactTypeService } from '../../../services/contact_types.service';
import { ClientManager } from '../../generics/client.manager';
import { ModelManager } from '../../generics/model.imanager';
import { AppCustomEvent } from '../../../appcustomevents';
import { Broadcaster } from '../../../services/broadcaster.service';
import { ToastMessage, ToastType } from '../../../models/toastMessage.model';
import { ClienteContacto } from '../../../models/clientContact.model';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  providers: [ClientService,ContactTypeService]
})
export class NewRegisterComponent extends ClientManager implements OnInit, ModelManager {
  deleteHandler(event: any) {
    throw new Error("Method not implemented.");
  }
  
  _client: Client;
  _contactTypes: ContactType[];

  saveHandler(event: any) {
    let ctx = this;
    this.getSavedMethod(event).subscribe(function (response) {
      ctx.router.navigateByUrl('clients');
      ctx.broadcaster.broadcast(AppCustomEvent.toast, new ToastMessage("Cliente creado correctamente.", 
      ToastType.Ok));
    });
  }
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    _clientService: ClientService, _contactTypesService:ContactTypeService,
    private broadcaster: Broadcaster
  ) {
    super(_clientService,_contactTypesService);
    this._client = new Client();
    this._client.clientesContactos.push(new ClienteContacto());
  }

  ngOnInit() {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this._contactTypesService.getTypes().subscribe(response => this._contactTypes = response); 

    if (id) {
      this._clientService.getClient(id).subscribe(response => this._client = response);
    }
  }
}
