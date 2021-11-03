import { RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { RoleComponent } from '../pages/role/role.component';
import { ActivitiesComponent } from './activities/activities.component';
import { PermissionComponent } from './permission/permission.component';
import { StateComponent } from './state/state.component';
import { UnitComponent } from './unit/unit.component';
import { CityComponent } from './city/city.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { SiteComponent } from './site/site.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { ProductSpecificationComponent } from './product-specification/product-specification.component';
import { ProjectLeadComponent } from './project-lead/project-lead.component';
import { ProjectQuotationComponent } from './project-quotation/project-quotation.component';
import { ProjectLeadUpdatesComponent } from './project-lead/project-lead-updates/project-lead-updates.component';
import { ProjectQuotationUpdatesComponent } from './project-quotation/project-quotation-updates/project-quotation-updates.component';
import { ProjectLostComponent } from './project-lost/project-lost.component';
import { ProjectLostUpdatesComponent } from './project-lost/project-lost-updates/project-lost-updates.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProjectOrderComponent } from './project-order/project-order.component';
import { ProjectOrderDetailsComponent } from './project-order/project-order-details/project-order-details.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderSpecifiedProductComponent } from './purchase-order/purchase-order-specified-product/purchase-order-specified-product.component';
import { AnnexureComponent } from './purchase-order/annexure/annexure.component';
import { AnnexureDetailsComponent } from './purchase-order/annexure/annexure-details/annexure-details.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path:'role',
      component:RoleComponent,
      data:{breadcrumb:'Role'},
    },
    {
      path:'activities',
      component:ActivitiesComponent,
      data:{breadcrumb:'Activities'},
    },
    {
      path:'permission',
      component:PermissionComponent,
      data:{breadcrumb:'Permission'},
    },
    {
      path:'state',
      component:StateComponent,
      data:{breadcrumb:'State'},
    },
    {
      path:'city',
      component:CityComponent,
      data:{breadcrumb:'City'},
    },
    {
      path:'unit',
      component:UnitComponent,
      data:{breadcrumb:'Unit'},
    },
    {
      path:'product',
      component:ProductComponent,
      data:{breadcrumb:'Product'},
    }, 
    {
      path:'product-category',
      component:ProductCategoryComponent,
      data:{breadcrumb:'Poduct Category'}
    },
    {
      path:'product-brand',
      component:ProductBrandComponent,
      data:{breadcrumb:'Poduct Brand'}
    },
    {
      path:'product-specification',
      component:ProductSpecificationComponent,
      data:{breadcrumb:'Product Specification'}
    },
    {
      path:'site',
      component:SiteComponent,
      data:{breadcrumb:'Site'}
    },
    {
      path:'user',
      component:UserComponent,
      data:{breadcrumb:'User'}
    },
    {
      path:'project-lead',
      component:ProjectLeadComponent,
      data:{breadcrumb:'Project Lead'}
    },
    {
      path:'project-lead-updates/:id',
      component:ProjectLeadUpdatesComponent,
      data:{breadcrumb:'Project Lead Updates'}
    },
    {
      path:'project-lead-updates',
      component:ProjectLeadUpdatesComponent,
      data:{breadcrumb:'Project Lead Updates'}
    },
    {
      path:'project-quotation',
      component:ProjectQuotationComponent,
      data:{breadcrumb:'Project Quotation'}
    },
    {
      path:'project-quotation-updates/:id',
      component:ProjectQuotationUpdatesComponent,
      data:{breadcrumb:'Project Quotation Updates'}
    },
    {
      path:'project-lost',
      component:ProjectLostComponent,
      data:{breadcrumb:'Project Lost'}
    },
    {
      path:'project-lost-updates',
      component:ProjectLostUpdatesComponent,
      data:{breadcrumb:'Project Lost Updates'}
    },
    {
      path:'vendor',
      component:SupplierComponent,
      data:{breadcrumb:'Vendor'}
    },
    {
      path:'project-order',
      component:ProjectOrderComponent,
      data:{breadcrumb:'Project Order'}
    },
    {
      path:'project-order-details/:id',
      component:ProjectOrderDetailsComponent,
      data:{breadcrumb:'Project Order Details'}
    },
    {
      path:'purchase-order',
      component:PurchaseOrderComponent,
      data:{breadcrumb:'Purchase Order Details'}
    },
    {
      path:'purchase-order-details/:id',
      component:PurchaseOrderSpecifiedProductComponent,
      data:{breadcrumb:'Purchase Order Details'}
    },
    {
      path:'annexure/:id',
      component:AnnexureComponent,
      data:{breadcrumb:'Annexure'}
    },
    {
      path:'annexure-details/:id',
      component:AnnexureDetailsComponent,
      data:{breeadcrumb:'Annexure Details'}
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
