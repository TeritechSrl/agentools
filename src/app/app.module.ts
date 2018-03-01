import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { MatIconModule } from '@angular/material/icon';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FilterPipeModule } from 'ngx-filter-pipe';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatCardModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { FormComponent } from './client/form/form.component';
import { ClientComponent } from './client/client.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { NewRegisterComponent } from './client/form/new-register/new-register.component';
import { ConfirmDialogComponent } from './generics/confirm-dialog/confirm-dialog.component';
import { PolicyComponent } from './policy/policy.component';
import { ReportsComponent } from './reports/reports.component';
import { InsurersComponent } from './insurers/insurers.component';
import { PolicyFormComponent } from './policy/policy-form/policy-form.component';
import { PolicyNewComponent } from './policy/policy-new/policy-new.component';
import { PolicyDetailComponent } from './policy/policy-detail/policy-detail.component';
import { InsuredFormComponent } from './policy/policy-form/insured-form/insured-form.component';
import { RegisterPayComponent } from './policy/policy-form/register-pay/register-pay.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpLogInterceptor } from './overriders/interceptorhttp.overrider';
import { Broadcaster } from './services/broadcaster.service';
import { AppDisableWhileLoading } from './directives/appDisableWhileLoading.directive';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AuthenticationModule } from './security/authentication.module';
import { AuthenticationGuard } from './security/authentication.guard';
import { LoginComponent } from './security/components/login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full', canActivate: [AuthenticationGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'authentication', component: LoginComponent },
  { path: 'clients', component: ClientComponent, canActivate: [AuthenticationGuard] },
  { path: 'client/:id', component: ClientDetailComponent, canActivate: [AuthenticationGuard]  },
  { path: 'newClient', component: NewRegisterComponent, canActivate: [AuthenticationGuard]  },
  { path: 'policy', component: PolicyComponent, canActivate: [AuthenticationGuard]  },
  { path: 'policy/:id', component: PolicyDetailComponent, canActivate: [AuthenticationGuard]  },
  { path: 'newPolicy', component: PolicyNewComponent, canActivate: [AuthenticationGuard]  },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthenticationGuard]  },
  { path: 'insurers', component: InsurersComponent, canActivate: [AuthenticationGuard]  }
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DashboardComponent,
    ClientComponent,
    ClientDetailComponent,
    NewRegisterComponent,
    ConfirmDialogComponent,
    PolicyComponent,
    ReportsComponent,
    InsurersComponent,
    PolicyFormComponent,
    PolicyNewComponent,
    PolicyDetailComponent,
    InsuredFormComponent,
    RegisterPayComponent,
    AppDisableWhileLoading
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AuthenticationModule,
    BrowserModule,
    BrowserAnimationsModule,
    FilterPipeModule,
    Angulartics2Module.forRoot([Angulartics2GoogleTagManager], {
      pageTracking: {
        clearIds: true,
      }}),
    ToastModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpLogInterceptor, multi: true },
    Broadcaster],
  entryComponents:[ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
