import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Insurer } from '../models/insurer.model';
import { GenericModelService } from './generics/genericservice.service';

@Injectable()
export class InsurerService extends GenericModelService<Insurer>{

    getModelInstance(): Insurer {
        return new Insurer();
    }
    constructor(
        protected http: HttpClient
    ) {
        super(http,'Aseguradoras');
    }

}