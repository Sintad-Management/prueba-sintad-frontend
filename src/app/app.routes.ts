import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { TipoDocumentoComponent } from './features/tipo-documento/tipo-documento.component';
import { TipoContribuyenteComponent } from './features/tipo-contribuyente/tipo-contribuyente.component';
import { EntidadComponent } from './features/entidad/entidad.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthGuard } from './core/guards/unauth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [UnauthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'entidades', component: EntidadComponent },
      { path: 'tipo-documento', component: TipoDocumentoComponent },
      { path: 'tipo-contribuyente', component: TipoContribuyenteComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
