import { Component, OnInit } from '@angular/core';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-dodaj-poznate-znamenitosti',
  templateUrl: './dodaj-poznate-znamenitosti.component.html',
  styleUrls: ['./dodaj-poznate-znamenitosti.component.scss']
})
export class DodajPoznateZnamenitostiComponent implements OnInit {

  public id ;
  public validateForm: FormGroup;
  public PoznateZnamenitostiLista: Array<any> = [];

  constructor( 
    private apiService: ApiService, 
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private ruta: ActivatedRoute ) {

      this.initForm();
      this.dohvatiPodatke();
      this.setId();
  }

  


  private initForm(): void {
    this.validateForm = this.fb.group({
      id_grada:         ['', [Validators.required]],
      ime_gradevine:    ['', [Validators.required]],
      arhitekt:         ['', [Validators.required]],
      godina_izgradnje: ['', [Validators.required]],
      opis_kraci:       ['', [Validators.required]],
      opis_duzi:        ['', [Validators.required]],
      adresa:           ['', [Validators.required]],
      sluzbena_stranica:['', [Validators.required]],
      slika:            ['', [Validators.required]],
    });

  }

  private dohvatiPodatke(): void {
    
      this.apiService.dohvatiPoznatuZnamenitost().subscribe(
        response => this.PoznateZnamenitostiLista = response.data,
        error => console.log(error)
      )

  }

  public setId(): void{ this.id = this.ruta.snapshot.params; }
  public onChange(result: Date): void {this.validateForm.value.godina_izgradnje = result;
  }
  public ngOnInit(): void {}

  
  // ========= HTML METODE =========


  public KreirajPoznatuZnamenitost(): any {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    
    return this.apiService.kreirajPoznatuZnamenitost(
      this.validateForm.value.id_grada,
      this.validateForm.value.ime_gradevine,
      this.validateForm.value.arhitekt,
      this.validateForm.value.godina_izgradnje,
      this.validateForm.value.opis_kraci,
      this.validateForm.value.opis_duzi,
      this.validateForm.value.adresa,
      this.validateForm.value.sluzbena_stranica,
      this.validateForm.value.slika
      ).subscribe(response => {
        if(response ) {
          console.log(this.validateForm.value);
          this.createMessage("success");
          this.dohvatiPodatke();
          this.initForm();
          this.router.navigate(['forme']);
        }
      },
      error => console.log(error,this.createMessage("error"))
    );

  }

  public AzurirajPoznatuZnamenitost(): any {

    
    return this.apiService.azurirajPoznatuZnamenitost(
      this.validateForm.value.id_grada,
      this.validateForm.value.ime_gradevine,
      this.validateForm.value.arhitekt,
      this.validateForm.value.godina_izgradnje,
      this.validateForm.value.opis_kraci,
      this.validateForm.value.opis_duzi,
      this.validateForm.value.adresa,
      this.validateForm.value.sluzbena_stranica,
      this.validateForm.value.slika,
      this.id
      ).subscribe(response => {
        if(response ) {
          console.log(this.validateForm.value);
          this.createMessage("success");
          this.dohvatiPodatke();
          this.initForm();
          this.router.navigate(['forme']);
        }
      },
      error => console.log(error,this.createMessage("error"))
    );

  }

  public NadiZnamenitost(): void {

    for (const i in this.PoznateZnamenitostiLista) {
      if(this.PoznateZnamenitostiLista[i].id == this.id.id )  {
        this.validateForm = this.fb.group({
        id_grada:         [this.PoznateZnamenitostiLista[i].id_grada],
        ime_gradevine:    [this.PoznateZnamenitostiLista[i].ime_gradevine],
        arhitekt:         [this.PoznateZnamenitostiLista[i].arhitekt],
        godina_izgradnje: [this.PoznateZnamenitostiLista[i].godina_izgradnje],
        opis_kraci:       [this.PoznateZnamenitostiLista[i].opis_kraci],
        opis_duzi:        [this.PoznateZnamenitostiLista[i].opis_duzi],
        adresa:           [this.PoznateZnamenitostiLista[i].adresa],
        sluzbena_stranica:[this.PoznateZnamenitostiLista[i].sluzbena_stranica],
        slika:            [this.PoznateZnamenitostiLista[i].slika],
        });
        this.id = this.PoznateZnamenitostiLista[i].id;

        break;
      }
    }
  }



  public createMessage(type: string): void {
    if (type === "success") {
      this.message.create(type, `Uspjesno `);

    } else  {
      this.message.create(type, `Netočni podatci.Probajte ponovo.`);
    }
  }


  // ========= VRACANJE =========
  
  public nazad():any{this.router.navigate(['forme']);}

}

