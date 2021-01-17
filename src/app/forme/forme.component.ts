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
  public MuzejiLista: Array<any> = [];
  public DvorciLista: Array<any> = [];
  public KluboviLista: Array<any> = [];
  public KazalistaLista: Array<any> = [];

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
    //Muzeji
    this.apiService.dohvatiMuzeje().subscribe(
      response => this.MuzejiLista = response.data,
      error => console.log(error)
    )
    //Dvorci
    this.apiService.dohvatiDvorce().subscribe(
      response => this.DvorciLista = response.data,
      error => console.log(error)
    )
    //Kazalista
    this.apiService.dohvatiKazalista().subscribe(
      response => this.KazalistaLista = response.data,
      error => console.log(error)
    )
    //Klubovi
    this.apiService.dohvatiKlubove().subscribe(
      response => this.KluboviLista = response.data,
      error => console.log(error)
    )
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
    if(ruta == 1){ this.router.navigate(['dodaj-drzavu/'+podatak]);                }
    if(ruta == 2){ this.router.navigate(['dodaj-grad/'+podatak]);                  }
    if(ruta == 3){ this.router.navigate(['dodaj-poznatu-znamenitost/'+podatak]);   }
    if(ruta == 4){ this.router.navigate(['muzej/'+podatak]);                       }
    if(ruta == 5){ this.router.navigate(['dvorci/'+podatak]);                       }
    if(ruta == 6){ this.router.navigate(['klubovi/'+podatak]);                     }
    if(ruta == 7){ this.router.navigate(['kazalista/'+podatak]);                   }
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

    if(brisi == 4){//MUZEJ
      return this.apiService.obrisiMuzej(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 5){//DVORCI
      return this.apiService.obrisiDvorac(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 6){//KLUBOVI
      return this.apiService.obrisiKlub(podatakId).subscribe(response => { if(response ){ 
        this.createMessage("success" ); }
       },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 7){//KAZALISTA
      return this.apiService.obrisiKazaliste(podatakId).subscribe(response => { if(response ){ 
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

public nazad():void{ this.router.navigate(['navigation']); }

public drzavePreusmjeri():void{ this.router.navigate(['dodaj-drzavu']);}

public gradPreusmjeri():void{ this.router.navigate(['dodaj-grad']);}

public poznataZnamenitostPreusmjeri():void {this.router.navigate(['dodaj-poznatu-znamenitost']);}

public muzejiPreusmjeri():void{ this.router.navigate(['muzej']);}

public dvoracPreusmjeri():void{ this.router.navigate(['dvorci']);}

public kluboviPreusmjeri():void{ this.router.navigate(['klubovi']);}

public kazalistaPreusmjeri():void{ this.router.navigate(['kazalista']);}

}


