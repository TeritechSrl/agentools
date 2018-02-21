import { Client } from "../../models/client.model";
import { ContactType } from "../../models/contact_type.model";
import { ClientService } from "../../services/clients.service";
import { ContactTypeService } from "../../services/contact_types.service";
import { ViewChild, ElementRef } from "@angular/core";

export abstract class ClientManager {

  _client: Client = new Client();
  _contactTypes: ContactType[];
  _loaded:boolean;
  _isSaving:boolean;

  constructor(protected _clientService: ClientService, 
    protected _contactTypesService:ContactTypeService
  ) {
  }
  
  @ViewChild('profilePhotoInput') profilePhotoInput: ElementRef;
  
  pickPhoto() {
    this.profilePhotoInput.nativeElement.click();
  }
  protected getSavedMethod(client: Client) {
    if (client.id) {
      return this._clientService.edit(client,client.id);
    } else {
      return this._clientService.create(client);
    }
  }
}
