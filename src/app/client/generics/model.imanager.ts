import { Client } from "../../models/client.model";
import { ContactType } from "../../models/contact_type.model";

export interface ModelManager{
    saveHandler(event:any);
    _client: Client;
    _contactTypes: ContactType[];
}