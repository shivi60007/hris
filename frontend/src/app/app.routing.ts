import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { ClientTemplateComponent } from './templates/client-template/client-template.component';
import { EmployeeTemplateComponent } from './templates/employee-template/employee-template.component';
import { SingleTemplateComponent } from './templates/single-template/single-template.component';

export const AppRoutes: Routes = [{
  path: '',
  component: ClientTemplateComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'apps',
    loadChildren: './apps/apps.module#AppsModule'
  },
  {
    path: 'organization',
    loadChildren: './organization/organization.module#OrganizationModule'
  },  {
    path: 'widgets',
    loadChildren: './widgets/widgets.module#WidgetsModule'
  }, {
    path: 'material',
    loadChildren: './material/material.module#MaterialComponentsModule'
  }, {
    path: 'ecommerce',
    loadChildren: './ecommerce/ecommerce.module#EcommerceModule'
  }, {
    path: 'taskboard',
    loadChildren: './taskboard/taskboard.module#TaskboardModule'
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormModule'
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule'
  }, {
    path: 'charts',
    loadChildren: './chartlib/chartlib.module#ChartlibModule'
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapModule'
  }, {
    path: 'dragndrop',
    loadChildren: './dragndrop/dragndrop.module#DragndropModule'
  }, {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    loadChildren: './session/session.module#SessionModule'
  }]
},/*{
  path: '',
  component: SingleTemplateComponent,
  children: [{
    path: '',
    loadChildren: './session/session.module#SessionModule'
  }]
},*/ {
  path: '**',
  redirectTo: 'session/404'
}];
