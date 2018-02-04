import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/clients.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../../models/client.model';
import { ContactType } from '../../models/contact_type.model';
import { ContactTypeService } from '../../services/contact_types.service';
import { ClientManager } from '../generics/client.manager';
import { ModelManager } from '../generics/model.imanager';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  providers: [ClientService,ContactTypeService]
})
export class ClientDetailComponent extends ClientManager implements OnInit, ModelManager {
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
    this._contactTypesService.getTypes().subscribe(response => {this._contactTypes = response; console.log(this._contactTypes)}); 

    if (id) {
      this._clientService.getClient(id).subscribe(response => this._client = response);
    }
  }
}
