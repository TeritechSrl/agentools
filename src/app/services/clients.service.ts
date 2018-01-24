import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Client } from '../models/client.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  constructor (
    private http: Http
  ) {}

  getClients():Observable<Client[]> {
    return this.http.get('https://teritechapi.azurewebsites.net/api/Clientes')
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
  }

}
