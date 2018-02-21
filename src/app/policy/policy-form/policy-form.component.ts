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
  _policyFields:PolicyField[];

  ngOnInit() {
    console.log(this._policy);
  }

}
