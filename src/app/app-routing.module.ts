import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormeComponent } from './forme/forme.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './travelBook/navigation/navigation.component'
import { DodajDrzavuComponent } from './travelBook/Forme/dodaj-drzavu/dodaj-drzavu.component';
import { DodajGradComponent } from './travelBook/Forme/dodaj-grad/dodaj-grad.component';
import { DodajPoznatuZnamenitostComponent } from './travelBook/Forme/dodaj-poznatu-znamenitost/dodaj-poznatu-znamenitost.component';


const routes: Routes = [
  { path: "login",          component: LoginComponent },
  { path: "forme",          component: FormeComponent },
  { path: "navigation",     component: NavigationComponent },

  { path: "dodaj-drzavu",     component: DodajDrzavuComponent },
  { path: "dodaj-drzavu/:id",     component: DodajDrzavuComponent },

  { path: "dodaj-grad",     component: DodajGradComponent },
  { path: "dodaj-grad/:id",     component: DodajGradComponent },

  
  { path: "dodaj-poznatu-znamenitost",     component: DodajPoznatuZnamenitostComponent },
  { path: "dodaj-poznatu-znamenitost/:id",     component: DodajPoznatuZnamenitostComponent },

  { path: '',       pathMatch: 'full',  redirectTo: 'login' },
  { path: "**",     pathMatch: "full",  redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
