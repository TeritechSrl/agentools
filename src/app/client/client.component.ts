import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/clients.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  providers:[ClientService]
})
export class ClientComponent implements OnInit {

  _clients: Client[];

  constructor(private _clientService:ClientService) { 
    
  }

  ngOnInit() {
    this._clientService.getClients().subscribe(function(response){
      this._clients = response;
      console.log(this._clients);
    });
  }

}
