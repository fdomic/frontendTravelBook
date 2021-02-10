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
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';

import { ApiService } from './api.services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormeComponent } from './forme-tablice/forme.component';
import { NavigationComponent } from './travelBook/navigation/navigation.component';
import { DodajDrzavuComponent } from './travelBook/Forme/dodaj-drzavu/dodaj-drzavu.component';
import { DodajGradComponent } from './travelBook/Forme/dodaj-grad/dodaj-grad.component';
import { DodajPoznateZnamenitostiComponent } from './travelBook/forme/dodaj-poznate-znamenitosti/dodaj-poznate-znamenitosti.component';
import { DodajMuzejeComponent } from './travelbook/forme/dodaj-muzeje/dodaj-muzeje.component';
import { DodajKluboveComponent } from './travelbook/forme/dodaj-klubove/dodaj-klubove.component';
import { DodajKazalistaComponent } from './travelbook/forme/dodaj-kazalista/dodaj-kazalista.component';
import { DodajDvorceComponent } from './travelbook/forme/dodaj-dvorce/dodaj-dvorce.component';
import { DodajMuzejCijenaComponent } from './travelbook/forme/dodaj-muzej-cijena/dodaj-muzej-cijena.component';
import { DodajKlubCijenaComponent } from './travelBook/forme/dodaj-klub-cijena/dodaj-klub-cijena.component';
import { DodajKazalisteCijenaComponent } from './travelBook/forme/dodaj-kazaliste-cijena/dodaj-kazaliste-cijena.component';
import { DodajDvorciCijenaComponent } from './travelBook/forme/dodaj-dvorci-cijena/dodaj-dvorci-cijena.component';
import { DodajPoznateZnamenitostiCijenaComponent } from './travelBook/forme/dodaj-poznate-znamenitosti-cijena/dodaj-poznate-znamenitosti-cijena.component';


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
    DodajDvorceComponent,
    DodajMuzejCijenaComponent,
    DodajKlubCijenaComponent,
    DodajKazalisteCijenaComponent,
    DodajDvorciCijenaComponent,
    DodajPoznateZnamenitostiCijenaComponent
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
    NzInputNumberModule,
    NzListModule,
    NzSpinModule,
    NzResultModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
