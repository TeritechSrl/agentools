import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/clients.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../../models/client.model';
import { ContactType } from '../../models/contact_type.model';
import { ContactTypeService } from '../../services/contact_types.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  providers: [ClientService,ContactTypeService]
})
export class ClientDetailComponent implements OnInit {

  _client: Client = new Client();
  _contactTypes: ContactType[];
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _clientService: ClientService, private _contactTypesService:ContactTypeService
  ) {

  }

  clientSavedHandler(event: Client) {
    let router: Router = this.router;
    if (event.id) {
      this._clientService.editClient(event).subscribe(function (response) {
        router.navigateByUrl('clients');
      });
    } else {
      this._clientService.createClient(event).subscribe(function (response) {
        router.navigateByUrl('clients');
      });
    }
  }
  ngOnInit() {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this._contactTypesService.getTypes().subscribe(response => this._contactTypes = response); 

    if (id) {
      this._clientService.getClient(id).subscribe(response => this._client = response);
    }
  }
}
