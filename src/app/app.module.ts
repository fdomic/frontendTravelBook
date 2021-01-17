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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { ApiService } from './api.services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormeComponent } from './forme/forme.component';
import { NavigationComponent } from './travelBook/navigation/navigation.component';
import { DodajDrzavuComponent } from './travelBook/Forme/dodaj-drzavu/dodaj-drzavu.component';
import { DodajGradComponent } from './travelBook/Forme/dodaj-grad/dodaj-grad.component';
import { DodajPoznateZnamenitostiComponent } from './travelBook/forme/dodaj-poznate-znamenitosti/dodaj-poznate-znamenitosti.component';
import { DodajMuzejeComponent } from './travelbook/forme/dodaj-muzeje/dodaj-muzeje.component';
import { DodajKluboveComponent } from './travelbook/forme/dodaj-klubove/dodaj-klubove.component';
import { DodajKazalistaComponent } from './travelbook/forme/dodaj-kazalista/dodaj-kazalista.component';
import { DodajDvorceComponent } from './travelbook/forme/dodaj-dvorce/dodaj-dvorce.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    FormeComponent,
    DodajDrzavuComponent,
    DodajGradComponent,
    DodajPoznateZnamenitostiComponent,
    DodajMuzejeComponent,
    DodajKluboveComponent,
    DodajKazalistaComponent,
    DodajDvorceComponent
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
    NzFormModule,
    NzDatePickerModule,
    NzInputNumberModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
