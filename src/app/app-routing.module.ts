import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { 
        path: 'app', component: HomeLayoutComponent,
        children: [
          { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'clientdetails', loadChildren: () => import('./clientdetails/clientdetails.module').then(m => m.ClientdetailsModule) },
          { path: 'engagement', loadChildren: () => import('./engagement/engagement.module').then(m => m.EngagementModule) },
          { path: 'auditor', loadChildren: () => import('./auditor/auditor.module').then(m => m.AuditorModule) },
        ]
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }