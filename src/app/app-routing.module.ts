import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';

const baseLayoutRouting: Routes = [
    
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./components/app-home/client-home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
  },
  
];

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: baseLayoutRouting
  },
 
  {
    path: 'authprovider',
    loadChildren: () => import('./components/auth-session/auth-provider/auth-provider.module').then(m => m.AuthProviderModule)
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./components/addproduct/addproduct.module').then(m => m.AddproductModule)
  },
  {
    path: 'adminhome',
    pathMatch: 'full',
    loadChildren: () => import('./components/app-home/admin-home/admin-home.module').then(m => m.AdminHomeModule)
  },
  {
    path: 'providerhome',
    pathMatch: 'full',
    loadChildren: () => import('./components/app-home/provider-home/provider-home.module').then(m => m.ProviderHomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth-session/auth-admin/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admindashboard',
    loadChildren: () => import('./components/dashboard/dashboard-admin/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'providerdashboard',
    loadChildren: () => import('./components/dashboard/dashboard-provider/dashboard.module').then(m => m.DashboardModule)
  },





  {path: '', redirectTo: '', pathMatch: 'full' },
  {path:'login', component:LoginAdminComponent},
  {path:'register', component:RegisterAdminComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
