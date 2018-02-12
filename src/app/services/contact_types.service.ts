import { Injectable }     from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactType } from '../models/contact_type.model';

@Injectable()
export class ContactTypeService {

  constructor (
    private http: HttpClient
  ) {}

  getTypes():Observable<ContactType[]> {
    return this.http.get<ContactType[]>('tiposcontactos');
  }
}
