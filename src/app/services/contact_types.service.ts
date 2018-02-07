import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { ContactType } from '../models/contact_type.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class ContactTypeService {

  baseUrl:string = "https://teritechapi.azurewebsites.net/api/";
  // baseUrl:string = "http://localhost:50776/api/";

  constructor (
    private http: Http
  ) {}

  getTypes():Observable<ContactType[]> {
    return this.http.get(this.baseUrl+'tiposcontactos')
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
