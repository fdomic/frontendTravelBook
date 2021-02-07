import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormeComponent } from './forme-tablice/forme.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './travelBook/navigation/navigation.component'
import { DodajDrzavuComponent } from './travelBook/Forme/dodaj-drzavu/dodaj-drzavu.component';
import { DodajGradComponent } from './travelBook/Forme/dodaj-grad/dodaj-grad.component';
import { DodajPoznateZnamenitostiComponent } from './travelBook/forme/dodaj-poznate-znamenitosti/dodaj-poznate-znamenitosti.component';
import { DodajMuzejeComponent } from './travelbook/forme/dodaj-muzeje/dodaj-muzeje.component';
import { DodajKluboveComponent } from './travelbook/forme/dodaj-klubove/dodaj-klubove.component';
import { DodajKazalistaComponent } from './travelbook/forme/dodaj-kazalista/dodaj-kazalista.component';
import { DodajDvorceComponent } from './travelbook/forme/dodaj-dvorce/dodaj-dvorce.component';



const routes: Routes = [
  { path: "login",          component: LoginComponent },
  { path: "forme",          component: FormeComponent },
  { path: "navigation",     component: NavigationComponent },

  //Drzava
  { path: "dodaj-drzavu",     component: DodajDrzavuComponent },
  { path: "dodaj-drzavu/:id", component: DodajDrzavuComponent },

  //Grad
  { path: "dodaj-grad",     component: DodajGradComponent },
  { path: "dodaj-grad/:id", component: DodajGradComponent },
  
  //Poznata znamenitost
  { path: "dodaj-poznatu-znamenitost",     component: DodajPoznateZnamenitostiComponent },
  { path: "dodaj-poznatu-znamenitost/:id", component: DodajPoznateZnamenitostiComponent },

  //Muzej
  { path: "dodaj-muzej",         component: DodajMuzejeComponent },
  { path: "dodaj-muzej/:id",     component: DodajMuzejeComponent },

   //Dvorci
   { path: "dodaj-dvorci",         component: DodajDvorceComponent },
   { path: "dodaj-dvorci/:id",     component: DodajDvorceComponent },

   //Klubovi
   { path: "dodaj-klubovi",         component: DodajKluboveComponent },
   { path: "dodaj-klubovi/:id",     component: DodajKluboveComponent },

   //Klubovi
   { path: "dodaj-kazalista",         component: DodajKazalistaComponent },
   { path: "dodaj-kazalista/:id",     component: DodajKazalistaComponent },

  { path: '',       pathMatch: 'full',  redirectTo: 'login' },
  { path: "**",     pathMatch: "full",  redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
