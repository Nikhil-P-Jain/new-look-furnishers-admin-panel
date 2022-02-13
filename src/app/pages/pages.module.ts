import { NgModule } from "@angular/core";
import {
  NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from "@nebular/theme";

import { HttpClientModule } from "@angular/common/http";
import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { RoleComponent } from "../pages/role/role.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ActivitiesComponent } from "./activities/activities.component";
import { PermissionComponent } from "./permission/permission.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StateComponent } from "./state/state.component";
import { CityComponent } from "./city/city.component";
import { UnitComponent } from "./unit/unit.component";
import { AddPermissionComponent } from "./permission/add-permission/add-permission.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";
import { ProductBrandComponent } from "./product-brand/product-brand.component";
import { SiteComponent } from "./site/site.component";
import { UserComponent } from "./user/user.component";
import { ProductComponent } from "./product/product.component";
import { ProductSpecificationComponent } from "./product-specification/product-specification.component";
import { ProjectLeadComponent } from "./project-lead/project-lead.component";
import { ProjectQuotationComponent } from "./project-quotation/project-quotation.component";
import { ProjectLeadUpdatesComponent } from "./project-lead/project-lead-updates/project-lead-updates.component";
import { ProjectQuotationUpdatesComponent } from "./project-quotation/project-quotation-updates/project-quotation-updates.component";
import { ProjectLostUpdatesComponent } from "./project-lost/project-lost-updates/project-lost-updates.component";
import { ProjectLostComponent } from "./project-lost/project-lost.component";
import { SupplierComponent } from "./supplier/supplier.component";
import { ProjectOrderComponent } from "./project-order/project-order.component";
import { ProjectOrderDetailsComponent } from "./project-order/project-order-details/project-order-details.component";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { PurchaseOrderSpecifiedProductComponent } from "./purchase-order/purchase-order-specified-product/purchase-order-specified-product.component";
import { AnnexureComponent } from "./purchase-order/annexure/annexure.component";
import { AnnexureDetailsComponent } from "./purchase-order/annexure/annexure-details/annexure-details.component";
import { NgxPrintModule } from "ngx-print";
import { BranchComponent } from "./branch/branch.component";
import { TermsComponent } from "./terms/terms.component";
import { EditorsModule } from "./editors/editors.module";
import { CKEditorModule } from "ng2-ckeditor";
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ECommerceModule,
    NbCardModule,
    MiscellaneousModule,
    NgxPrintModule,
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
    EditorsModule,
    CKEditorModule,
  ],
  entryComponents: [PermissionComponent, AddPermissionComponent],
  declarations: [
    PagesComponent,
    AddPermissionComponent,
    RoleComponent,
    ActivitiesComponent,
    PermissionComponent,
    StateComponent,
    CityComponent,
    UnitComponent,
    ProductCategoryComponent,
    ProductBrandComponent,
    SiteComponent,
    UserComponent,
    ProductComponent,
    ProductSpecificationComponent,
    ProjectLeadComponent,
    ProjectQuotationComponent,
    ProjectLeadUpdatesComponent,
    ProjectQuotationUpdatesComponent,
    ProjectLostUpdatesComponent,
    ProjectLostComponent,
    SupplierComponent,
    ProjectOrderComponent,
    ProjectOrderDetailsComponent,
    PurchaseOrderComponent,
    PurchaseOrderSpecifiedProductComponent,
    AnnexureComponent,
    AnnexureDetailsComponent,
    BranchComponent,
    TermsComponent,
  ],
})
export class PagesModule {}
