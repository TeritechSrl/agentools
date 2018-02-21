import { BaseModel } from "./base.model";
import { PolicyField } from "./policyfield.model";

export class PolicyCategory extends BaseModel{
    constructor(){
        super();
        this.polizaRamos = [];
    }
    polizaRamos:PolicyField[];
}