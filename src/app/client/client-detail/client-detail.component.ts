import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClientService } from '../../services/clients.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../../models/client.model';
import { ContactType } from '../../models/contact_type.model';
import { ContactTypeService } from '../../services/contact_types.service';
import { ClientManager } from '../generics/client.manager';
import { ModelManager } from '../generics/model.imanager';
import { FileUploaderService } from '../../services/fileuploader.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  providers: [ClientService,ContactTypeService,FileUploaderService]
})
export class ClientDetailComponent extends ClientManager implements OnInit, ModelManager {
  
  @ViewChild('profilePhotoInput') profilePhotoInput:ElementRef;

  pickPhoto(){
    this.profilePhotoInput.nativeElement.click();
  }
  deleteHandler(event: Client) {
    let router: Router = this.router;
    this._clientService.deleteClient(event).subscribe(function (response) {
      router.navigateByUrl('clients');
    });
  }
  _client: Client;
  _contactTypes: ContactType[];
  saveImage(event: any,id:number){
    let cl = this._client;
    this._fileUploader.avatarChange(event,id).subscribe(function(data){
      cl.avatar = data;
    });
  }
  saveHandler(event: any) {
    let router: Router = this.router;
    this.getSavedMethod(event).subscribe(function (response) {
      router.navigateByUrl('clients');
    });
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    _clientService: ClientService, 
    _contactTypesService:ContactTypeService,
    private _fileUploader:FileUploaderService
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
