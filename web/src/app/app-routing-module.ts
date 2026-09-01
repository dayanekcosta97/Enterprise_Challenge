import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { EntregasComponent } from './pages/entregas/entregas.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Dashboard | Smart Logistics' },
  { path: 'entregas', component: EntregasComponent, title: 'Entregas | Smart Logistics' },
  { path: 'admin', component: AdminComponent, title: 'Nova Entrega | Smart Logistics' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
