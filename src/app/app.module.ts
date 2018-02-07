import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import {MatIconModule} from '@angular/material/icon';

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
  MatTooltipModule
} from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { FormComponent } from './client/form/form.component';
import { ClientComponent } from './client/client.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { NewRegisterComponent } from './client/form/new-register/new-register.component';
import { PolicyComponent } from './policy/policy.component';
import { ReportsComponent } from './reports/reports.component';
import { InsurersComponent } from './insurers/insurers.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'client/:id', component: ClientDetailComponent },
  { path: 'newClient', component: NewRegisterComponent },
  { path: 'policy', component: PolicyComponent },
  // { path: 'policy/:id', component: PolicyComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'insurers', component: InsurersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DashboardComponent,
    ClientComponent,
    ClientDetailComponent,
    NewRegisterComponent,
    PolicyComponent,
    ReportsComponent,
    InsurersComponent,
  ],
  imports: [
    HttpModule,
    JsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
