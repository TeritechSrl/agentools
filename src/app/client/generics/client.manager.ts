import { Client } from "../../models/client.model";
import { ContactType } from "../../models/contact_type.model";
import { ClientService } from "../../services/clients.service";
import { ContactTypeService } from "../../services/contact_types.service";

export class ClientManager {

  _client: Client = new Client();
  _contactTypes: ContactType[];

  constructor(protected _clientService: ClientService, 
    protected _contactTypesService:ContactTypeService
  ) {
  }
  protected getSavedMethod(client: Client) {
    if (client.id) {
      return this._clientService.editClient(client);
    } else {
      return this._clientService.createClient(client);
    }
  }
}
