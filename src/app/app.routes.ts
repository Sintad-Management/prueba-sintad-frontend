import { Routes } from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component';
import {TipoDocumentoComponent} from './features/tipo-documento/tipo-documento.component';
import {TipoContribuyenteComponent} from './features/tipo-contribuyente/tipo-contribuyente.component';
import {EntidadComponent} from './features/entidad/entidad.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
  //canActivate: [AuthGuard],
    children: [
      { path: 'entidades', component: EntidadComponent },
      { path: 'tipo-documento', component: TipoDocumentoComponent },
      { path: 'tipo-contribuyente', component: TipoContribuyenteComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
