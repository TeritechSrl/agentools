import { Component, OnInit } from '@angular/core';
import { InsurerService } from '../../services/insurer.service';
import { Insurer } from '../../models/insurer.model';
import { Policy } from '../../models/policy.model';
import { PolicyCategoryService } from '../../services/policycategory.service';
import { PolicyCategory } from '../../models/policycategory.model';
import { PolicyType } from '../../models/policytype.model';
import { PolicyTypeService } from '../../services/policytype.service';

@Component({
  selector: 'app-policy-new',
  templateUrl: './policy-new.component.html',
  providers: [InsurerService, PolicyCategoryService,PolicyTypeService]
})
export class PolicyNewComponent implements OnInit {

  constructor(private insurerService: InsurerService,
    private categoriesService: PolicyCategoryService,
    private typesService: PolicyTypeService) {
    this._policy = new Policy();
  }

  _policy: Policy;
  _insurers: Insurer[];
  _policyCategories: PolicyCategory[];
  _policyTypes: PolicyType[];

  ngOnInit() {
    this.insurerService.getList().subscribe(response => this._insurers = response);
    this.categoriesService.getList().subscribe(response => this._policyCategories = response);
    this.typesService.getList().subscribe(response => this._policyTypes = response);
  }

}
