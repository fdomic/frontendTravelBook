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

  
  public Gradovi: Array<any> = [];  
  public Drzave: Array<any> = [];
  public id: any;
  public classGrad: DodajGradComponent ;

  constructor( private apiService: ApiService, private router: Router,private message: NzMessageService ,
    ) {
    this.dohvatiPodatke();
  }
  
  

  
  private dohvatiPodatke(): void {
    
    //Drzava
    this.apiService.dohvatiDrzavu().subscribe(
      response => this.Drzave = response.data,
      error => console.log(error)
    )
    //Gradovi
    this.apiService.dohvatiGrad().subscribe(
      response => this.Gradovi = response.data,
      error => console.log(error)
    )
    
  }

  public getNazivDrzave(id_drzave: any): any {

    for (const i in this.Drzave) {
      if(this.Drzave[i].id == id_drzave )  {
        return this.Drzave[i].naziv_drzave;
      }
    }

  }

  public submitPodatak(podatak,ruta):any{
    if(ruta == 1){ this.router.navigate(['dodaj-drzavu/'+podatak]); }
    if(ruta == 2){ this.router.navigate(['dodaj-grad/'+podatak]);   }
  }

  public brisiPodatak(podatakId ,brisi ):any{

    if(brisi == 2){
      return this.apiService.obrisiGrad(podatakId).subscribe(response => { if(response ){ 
         this.createMessage("success" ); }
        },error => console.log(error,this.createMessage("error")));
    }

    if(brisi == 1){
      return this.apiService.obrisiDrzavu(podatakId).subscribe(response => { if(response ){ 
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

  ngOnInit(): void {}

//-----------------

public drzaveRedirect():void{ this.router.navigate(['dodaj-drzavu']);}
public gradRedirect():void{ this.router.navigate(['dodaj-grad']);}
public nazad():void{ this.router.navigate(['navigation']); }

public poznataZnamenitostRedirect():void {this.router.navigate(['dodaj-poznatu-znamenitost']);}


}
