import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadComponent: () => import('../app/pages/components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    loadComponent: () => import('../app/pages/components/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'control-panel',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard', 
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('../app/pages/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'manage-castes',
        canActivate: [AuthGuard],
        loadComponent: () => import('../app/pages/components/manage-castes/manage-castes.component').then(m => m.ManageCastesComponent),
      },
      {
        path: 'manage-languages',
        canActivate: [AuthGuard],
        loadComponent: () => import('../app/pages/components/manage-languages/manage-languages.component').then(m => m.ManageLanguagesComponent),
      },
      {
        path: 'manage-religions',
        canActivate: [AuthGuard],
        loadComponent: () => import('../app/pages/components/manage-religions/manage-religions.component').then(m => m.ManageReligionsComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' }
];


