import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../services/clients.service';
import { Client } from '../models/client.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Paged } from '../models/paged.model';
import { PageEvent } from '@angular/material';
import { FileManagerService } from '../services/filemanager.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  providers: [ClientService,FileManagerService]
})
export class ClientComponent implements OnInit {

  _clients: Paged<Client> = new Paged<Client>();
  _pageSize:number=10;
  _pageNumber:number=0;
  _filterClients:string='';
  _clientesAutoComplete:Client[];

  constructor(private _clientService: ClientService,
  private _fileManager: FileManagerService) {
    
  }
  exportClient(){
    this._fileManager.export("Clientes");
  }
  paginationChanged(pageEvent:PageEvent){
    this._pageNumber=pageEvent.pageIndex;
    this._pageSize=pageEvent.pageSize;

    this._getClientsPaged();
  }
  searchClient(){
    this._getClientsPaged();
  }
  ngOnInit() {
   this._getClientsPaged();
  }
  _getClientsPaged(){
    this._clientService.getListPaged(this._pageNumber,this._pageSize,this._filterClients).subscribe(response => {
      this._clients = response;
    });
    /*
    this._clientService.getList().subscribe(response => {
      this._clientesAutoComplete = response;
    });
    */
  }
}