import { Component, OnInit } from '@angular/core';

import {DodajGradComponent} from '../travelBook/Forme/dodaj-grad/dodaj-grad.component'

import { ApiService } from '../api.services';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-forme',
  templateUrl: './forme.component.html',
  styleUrls: ['./forme.component.scss']
})
export class FormeComponent implements OnInit {

  
  public GradoviLista: Array<any> = [];  
  public DrzaveLista: Array<any> = [];

  public PoznateZnamenitostiLista: Array<any> = [];
  public PoznateZnamenitostiCijenaLista: Array<any> = [];

  public MuzejiLista: Array<any> = [];
  public MuzejiCijenaLista: Array<any> = [];

  public DvorciLista: Array<any> = [];
  public DvorciCijenaLista: Array<any> = [];

  public KluboviLista: Array<any> = [];
  public KluboviCijenaLista: Array<any> = [];

  public KazalistaLista: Array<any> = [];
  public KazalistaCijenaLista: Array<any> = [];

  public id: any;
  public classGrad: DodajGradComponent ;

  constructor( 
    private apiService: ApiService, 
    private router: Router,
    private message: NzMessageService ,
  ){
    this.dohvatiPodatke();
  }
  
  private dohvatiPodatke(): void {
    
    //Drzava
    this.apiService.dohvatiDrzavu().subscribe(
      response => this.DrzaveLista = response.data,
      error => console.log(error)
    )
    //GradoviLista
    this.apiService.dohvatiGrad().subscribe(
      response => this.GradoviLista = response.data,
      error => console.log(error)
    )
    //Poznate znamenitosti
    this.apiService.dohvatiPoznatuZnamenitost().subscribe(
      response => this.PoznateZnamenitostiLista = response.data,
      error => console.log(error)
    )
    //Poznate znamenitosti cijena
     this.apiService.dohvatiPoznatuZnamenitostCijena().subscribe(
      response => this.PoznateZnamenitostiCijenaLista = response.data,
      error => console.log(error)
    )
    //Muzeji
    this.apiService.dohvatiMuzeje().subscribe(
      response => this.MuzejiLista = response.data,
      error => console.log(error)
    )
    //Muzeji cijena
     this.apiService.dohvatiMuzejiCijena().subscribe(
      response => this.MuzejiCijenaLista = response.data,
      error => console.log(error)
    )
    //Dvorci
    this.apiService.dohvatiDvorce().subscribe(
      response => this.DvorciLista = response.data,
      error => console.log(error)
    )
    //Dvorci cijena
    this.apiService.dohvatiDvorciCijena().subscribe(
      response => this.DvorciCijenaLista = response.data,
      error => console.log(error)
    )
    //Kazalista
    this.apiService.dohvatiKazalista().subscribe(
      response => this.KazalistaLista = response.data,
      error => console.log(error)
    )
    //Kazalista cijena
    this.apiService.dohvatiKazalistaCijena().subscribe(
      response => this.KazalistaCijenaLista = response.data,
      error => console.log(error)
    )
    //Klubovi
    this.apiService.dohvatiKlubove().subscribe(
      response => this.KluboviLista = response.data,
      error => console.log(error)
    )
    //Klubovi cijena
    this.apiService.dohvatiKluboviCijena().subscribe(
      response => this.KluboviCijenaLista = response.data,
      error => console.log(error)
    )
   

  }

  public getNaziv(id_naziv: any, broj): any {


    if(broj==1){//Drzava 
      for (const i in this.DrzaveLista) {
        if(this.DrzaveLista[i].id == id_naziv)  {
          return this.DrzaveLista[i].naziv_drzave;
        }
      }
    }

    if(broj==2){//Grad 
      for (const i in this.GradoviLista) {
        if(this.GradoviLista[i].id == id_naziv)  {
          return this.GradoviLista[i].naziv_grada;
        }
      }
    }

    if(broj==3){//Poznata znamenitost 
      for (const i in this.PoznateZnamenitostiLista) {
        if(this.PoznateZnamenitostiLista[i].id == id_naziv)  {
          return this.PoznateZnamenitostiLista[i].ime_gradevine;
        }
      }
    }

    if(broj==4){//Muzej
      for (const i in this.MuzejiLista) {
        if(this.MuzejiLista[i].id == id_naziv)  {
          return this.MuzejiLista[i].ime_gradevine;
        }
      }
    }

    if(broj==5){//Klub
      for (const i in this.KluboviLista) {
        if(this.KluboviLista[i].id == id_naziv)  {
          return this.KluboviLista[i].ime_gradevine;
        }
      }
    }

    
    if(broj==6){//Kazaliste
      for (const i in this.KazalistaLista) {
        if(this.KazalistaLista[i].id == id_naziv)  {
          return this.KazalistaLista[i].ime_gradevine;
        }
      }
    }

    
    if(broj==7){//Dvorci
      for (const i in this.DvorciLista) {
        if(this.DvorciLista[i].id == id_naziv)  {
          return this.DvorciLista[i].ime_gradevine;
        }
      }
    }




  }

  public getNazivDrzave(id_drzave: any): any {
    for (const i in this.DrzaveLista) {
      if(this.DrzaveLista[i].id == id_drzave)  {
        return this.DrzaveLista[i].naziv_drzave;
      }
    }
  }

  public getNazivGrada(id_grada: any): any {
    for (const i in this.GradoviLista) {
      if(this.GradoviLista[i].id == id_grada)  {
        return this.GradoviLista[i].naziv_grada;
      }
    }
  }

  public submitPodatak(podatak,ruta):any{
    if(ruta == 1){ this.router.navigate(['dodaj-drzavu/'+podatak]);                     }
    if(ruta == 2){ this.router.navigate(['dodaj-grad/'+podatak]);                       }
    //-
    if(ruta == 3){ this.router.navigate(['dodaj-poznatu-znamenitost/'+podatak]);        }
    if(ruta == 31){ this.router.navigate(['dodaj-poznatu-znamenitost-cijena/'+podatak]);}
    //-
    if(ruta == 4){  this.router.navigate(['dodaj-muzej/'+podatak]);                      }
    if(ruta == 41){ this.router.navigate(['dodaj-muzej-cijena/'+podatak]);               }
    if(ruta == 42){ this.router.navigate(['dodaj-poznata-dijela/'+podatak])              }
    //-
    if(ruta == 5){  this.router.navigate(['dodaj-klubovi/'+podatak]);                    }
    if(ruta == 51){ this.router.navigate(['dodaj-klubovi-cijena/'+podatak]);             }
    //-
    if(ruta == 6){  this.router.navigate(['dodaj-kazalista/'+podatak]);                  }
    if(ruta == 61){ this.router.navigate(['dodaj-kazalista-cijena/'+podatak]);           }
    //-
    if(ruta == 7){  this.router.navigate(['dodaj-dvorci/'+podatak]);                     }
    if(ruta == 71){ this.router.navigate(['dodaj-dvorci-cijene/'+podatak]);              }
  }

  public brisiPodatak(podatakId ,brisi ):any{

    if(brisi == 1){//DRZAVA
      return this.apiService.obrisiDrzavu(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 2){//GRAD
      return this.apiService.obrisiGrad(podatakId).subscribe(response => { if(response ){ 
         this.createMessage("success" ); }
        },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 3){//POZNATA ZNAMENITOST
      return this.apiService.obrisiPoznatuZnamenitost(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 31){//POZNATA ZNAMENITOST CIJENA
      return this.apiService.obrisiPoznatuZnamenitostCijena(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 4){//MUZEJ
      return this.apiService.obrisiMuzej(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 41){//MUZEJ CIJENA
      return this.apiService.obrisiMuzejCijena(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 5){//KLUBOVI
      return this.apiService.obrisiKlub(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 51){//KLUBOVI CIJENA
      return this.apiService.obrisiKlubCijena(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 6){//KAZALISTA
      return this.apiService.obrisiKazaliste(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 61){//KAZALISTA CIJENA
      return this.apiService.obrisiKazalisteCijena(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 71){//DVORCI CIJENA
      return this.apiService.obrisiDvorciCijena(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error"))); 
    }
    
    if(brisi == 7){//DVORCI
      return this.apiService.obrisiDvorac(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error"))); 
    }  
  }

  public createMessage(type: string): void {
    if (type === "success") {
      this.message.create(type, `Uspjesno `);

    } else  {
      this.message.create(type, `Netočni podatci.Probajte ponovo.`);
    }
  }

  public ngOnInit(): void {}

//-----------------

//Nazad u navigaciju
public nazad():void{ this.router.navigate(['navigation']); }

//Grad i Drzava
public drzavePreusmjeri():void { this.router.navigate(['dodaj-drzavu']);}
public gradPreusmjeri():void   { this.router.navigate(['dodaj-grad']);  }

//PoznateZnamenitosti
public poznataZnamenitostPreusmjeri():void       { this.router.navigate(['dodaj-poznatu-znamenitost']);         }
public poznataZnamenitostCijenaPreusmjeri():void { this.router.navigate(['dodaj-poznatu-znamenitost-cijena']); }

//Muzeji
public muzejiPreusmjeri():void              { this.router.navigate(['dodaj-muzej']);          }
public muzejiCijenaPreusmjeri():void        { this.router.navigate(['dodaj-muzej-cijena']);   }
public muzejiPoznataDijelaPreusmjeri():void { this.router.navigate(['dodaj-poznata-dijela']); }

//Dvorci
public dvoracPreusmjeri():void          { this.router.navigate(['dodaj-dvorci']);           }
public dvoracCijenaPreusmjeri():void    { this.router.navigate(['dodaj-dvorci-cijena']);    }

//Klubovi
public kluboviPreusmjeri():void         { this.router.navigate(['dodaj-klubovi']);          }
public kluboviCijenaPreusmjeri():void   { this.router.navigate(['dodaj-klubovi-cijena']);   }

//Kazalista
public kazalistaPreusmjeri():void       { this.router.navigate(['dodaj-kazalista']);        }
public kazalistaCijenaPreusmjeri():void { this.router.navigate(['dodaj-kazalista-cijena']); }

}


