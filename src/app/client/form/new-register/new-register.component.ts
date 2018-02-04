import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ContactType } from '../../../models/contact_type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/clients.service';
import { ContactTypeService } from '../../../services/contact_types.service';
import { ClientManager } from '../../generics/client.manager';
import { ModelManager } from '../../generics/model.imanager';

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
    let router: Router = this.router;
    this.getSavedMethod(event).subscribe(function (response) {
      router.navigateByUrl('clients');
    });
  }
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    _clientService: ClientService, _contactTypesService:ContactTypeService
  ) {
    super(_clientService,_contactTypesService);
  }

  ngOnInit() {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this._contactTypesService.getTypes().subscribe(response => this._contactTypes = response); 

    if (id) {
      this._clientService.getClient(id).subscribe(response => this._client = response);
    }
  }
}
