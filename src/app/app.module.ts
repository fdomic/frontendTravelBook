import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';

import { ApiService } from './api.services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormeComponent } from './forme/forme.component';
import { NavigationComponent } from './travelBook/navigation/navigation.component';
import { DodajDrzavuComponent } from './travelBook/Forme/dodaj-drzavu/dodaj-drzavu.component';
import { DodajGradComponent } from './travelBook/Forme/dodaj-grad/dodaj-grad.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    FormeComponent,
    DodajDrzavuComponent,
    DodajGradComponent
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzMessageModule,
    NzFormModule 
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
