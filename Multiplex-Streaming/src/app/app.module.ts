import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './Components/layout/layout.module';
import { PagesModule } from './Components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxParticlesModule } from 'ngx-particlesjs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    PagesModule,
    BrowserAnimationsModule,
    PagesModule,
    NgxParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
