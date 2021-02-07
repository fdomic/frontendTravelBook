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
import { DodajMuzejCijenaComponent } from './travelbook/forme/dodaj-muzej-cijena/dodaj-muzej-cijena.component';
import { DodajPoznateZnamenitostiCijenaComponent } from './travelBook/forme/dodaj-poznate-znamenitosti-cijena/dodaj-poznate-znamenitosti-cijena.component';
import { DodajDvorciCijenaComponent } from './travelBook/forme/dodaj-dvorci-cijena/dodaj-dvorci-cijena.component';
import { DodajKlubCijenaComponent } from './travelBook/forme/dodaj-klub-cijena/dodaj-klub-cijena.component';
import { DodajKazalisteCijenaComponent } from './travelBook/forme/dodaj-kazaliste-cijena/dodaj-kazaliste-cijena.component';

const routes: Routes = [
  { path: "login",           component: LoginComponent        },
  { path: "forme",           component: FormeComponent        },
  { path: "navigation",      component: NavigationComponent   },

  //Drzava
  { path: "dodaj-drzavu",     component: DodajDrzavuComponent },
  { path: "dodaj-drzavu/:id", component: DodajDrzavuComponent },

  //Grad
  { path: "dodaj-grad",       component: DodajGradComponent   },
  { path: "dodaj-grad/:id",   component: DodajGradComponent   },
  
  //Poznata znamenitost
  { path: "dodaj-poznatu-znamenitost",            component: DodajPoznateZnamenitostiComponent       },
  { path: "dodaj-poznatu-znamenitost/:id",        component: DodajPoznateZnamenitostiComponent       },
  { path: "dodaj-poznatu-znamenitost-cijena",     component: DodajPoznateZnamenitostiCijenaComponent },
  { path: "dodaj-poznatu-znamenitost-cijena/:id", component: DodajPoznateZnamenitostiCijenaComponent },

  //Muzej
  { path: "dodaj-muzej",             component: DodajMuzejeComponent            },
  { path: "dodaj-muzej/:id",         component: DodajMuzejeComponent            },
  { path: "dodaj-muzej-cijena",      component: DodajMuzejCijenaComponent       },
  { path: "dodaj-muzej-cijena/:id",  component: DodajMuzejCijenaComponent       },
  { path: "dodaj-poznata-dijela",    component: DodajMuzejCijenaComponent       },
  { path: "dodaj-poznata-dijela/:id",component: DodajMuzejCijenaComponent       },

  

  //Dvorci
  { path: "dodaj-dvorci",            component: DodajDvorceComponent            },
  { path: "dodaj-dvorci/:id",        component: DodajDvorceComponent            },
  { path: "dodaj-dvorci-cijena",     component: DodajDvorciCijenaComponent      },
  { path: "dodaj-dvorci-cijena/:id", component: DodajDvorciCijenaComponent      },

  //Klubovi
  { path: "dodaj-klubovi",            component: DodajKluboveComponent          },
  { path: "dodaj-klubovi/:id",        component: DodajKluboveComponent          },
  { path: "dodaj-klubovi-cijena",     component: DodajKlubCijenaComponent       },
  { path: "dodaj-klubovi-cijena/:id", component: DodajKlubCijenaComponent       },

  //Kazalista
  { path: "dodaj-kazalista",           component: DodajKazalistaComponent       },
  { path: "dodaj-kazalista/:id",       component: DodajKazalistaComponent       },
  { path: "dodaj-kazalista-cijena",    component: DodajKazalisteCijenaComponent },
  { path: "dodaj-kazalista-cijena/:id",component: DodajKazalisteCijenaComponent },

  { path: '',       pathMatch: 'full',  redirectTo: 'login' },
  { path: "**",     pathMatch: "full",  redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
