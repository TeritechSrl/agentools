import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Client } from '../models/client.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Paged } from '../models/paged.model';
import { ParserToModel } from './parserToModel.service';
import { GenericModelService } from './generics/genericservice.service';

@Injectable()
export class ClientService extends GenericModelService<Client> {

  getModelInstance(): Client {
    return new Client();
  }
  constructor(
    protected http: HttpClient
  ) {
    super(http,'Clientes');
  }
  saveAvatar(clientId: number, file: any): Observable<string> {
    return this.http.post<string>('Clientes/UploadProfilePicture/' + clientId, file);
  }
}
