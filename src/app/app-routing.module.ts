import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { 
        path: 'app', component: HomeLayoutComponent,
        children: [
          { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        ]
    },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }