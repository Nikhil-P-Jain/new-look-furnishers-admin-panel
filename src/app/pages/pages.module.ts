import { NgModule } from '@angular/core';
import {NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, 
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { RoleComponent } from '../pages/role/role.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ActivitiesComponent } from './activities/activities.component';
import { PermissionComponent } from './permission/permission.component';
import { AddPermissionComponent } from './permission/add-permission/add-permission.component';
import { EditPermissionComponent } from './permission/edit-permission/edit-permission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { UnitComponent } from './unit/unit.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    ECommerceModule,
    NbCardModule,
    MiscellaneousModule,
    NbCheckboxModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    //...
    AddPermissionComponent,
    EditPermissionComponent,
    PermissionComponent
    //...
   ],
  declarations: [
    PagesComponent,RoleComponent,ActivitiesComponent, PermissionComponent, AddPermissionComponent, EditPermissionComponent, StateComponent, CityComponent, UnitComponent
  ],
})
export class PagesModule {
}