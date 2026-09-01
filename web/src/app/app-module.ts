import { provideHttpClient } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminComponent } from './pages/admin/admin.component';
import { EntregasComponent } from './pages/entregas/entregas.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [App, HomeComponent, EntregasComponent, AdminComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
