import { Component, OnInit, Input } from '@angular/core';
import { Insurer } from '../../models/insurer.model';
import { Policy } from '../../models/policy.model';
import { PolicyType } from '../../models/policytype.model';
import { PolicyCategory } from '../../models/policycategory.model';
import { PolicyField } from '../../models/policyfield.model';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styles: []
})
export class PolicyFormComponent implements OnInit {

  constructor() {
    this._policyFields = [];
    this._policyCategory = new PolicyCategory();
  }

  @Input('insurers')
  _insurers: Insurer[];
  @Input('policyTypes')
  _policyTypes: PolicyType[];
  @Input('policyCategories')
  _policyCategories: PolicyCategory[];
  @Input('policy')
  _policy: Policy;

  _policyCategory: PolicyCategory;
  _policyFields: PolicyField[];

  ngOnInit() {
    console.log(this._policy);
  }
  updatePolicyFields(policycategory) {
    this._policy.idRamo = null;
    this._policyFields = [];
    for (let index = 0; index < policycategory.polizaRamos.length; index++) {
      const ramo = policycategory.polizaRamos[index] as PolicyField;
      if(this._policy.idTipo >= ramo.idTipoPoliza){
        this._policyFields.push(ramo);
      }
    }
  }
}
