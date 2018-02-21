import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModelService } from './generics/genericservice.service';
import { PolicyCategory } from '../models/policycategory.model';

@Injectable()
export class PolicyCategoryService extends GenericModelService<PolicyCategory>{

    getModelInstance(): PolicyCategory {
        return new PolicyCategory();
    }
    constructor(
        protected http: HttpClient
    ) {
        super(http,'PolizasCategorias');
    }

}