import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModelService } from './generics/genericservice.service';
import { PolicyType } from '../models/policytype.model';

@Injectable()
export class PolicyTypeService extends GenericModelService<PolicyType>{

    getModelInstance(): PolicyType {
        return new PolicyType();
    }
    constructor(
        protected http: HttpClient
    ) {
        super(http,'TiposPolizas');
    }

}