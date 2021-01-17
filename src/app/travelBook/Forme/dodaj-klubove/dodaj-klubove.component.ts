import { Component, OnInit } from '@angular/core';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-dodaj-klubove',
  templateUrl: './dodaj-klubove.component.html',
  styleUrls: ['./dodaj-klubove.component.scss']
})
export class DodajKluboveComponent implements OnInit {

  public id ;
  public validateForm: FormGroup;
  public KluboviLista: Array<any> = [];

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
    
      this.apiService.dohvatiKlubove().subscribe(
        response => this.KluboviLista = response.data,
        error => console.log(error)
      )

  }

  public setId(): void{ this.id = this.ruta.snapshot.params; }
  public onChange(result: Date): void { this.validateForm.value.godina_izgradnje = result;
  }
  public ngOnInit(): void {}

  
  // ========= HTML METODE =========


  public KreirajKlub(): any {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    
    return this.apiService.kreirajKlub(
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

  public AzurirajKlub(): any {

    return this.apiService.azurirajKlub(
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

  public NadiKlub(): void {

    for (const i in this.KluboviLista) {
      if(this.KluboviLista[i].id == this.id.id )  {
        this.validateForm = this.fb.group({
        id_grada:         [this.KluboviLista[i].id_grada],
        ime_gradevine:    [this.KluboviLista[i].ime_gradevine],
        arhitekt:         [this.KluboviLista[i].arhitekt],
        godina_izgradnje: [this.KluboviLista[i].godina_izgradnje],
        opis_kraci:       [this.KluboviLista[i].opis_kraci],
        opis_duzi:        [this.KluboviLista[i].opis_duzi],
        adresa:           [this.KluboviLista[i].adresa],
        sluzbena_stranica:[this.KluboviLista[i].sluzbena_stranica],
        slika:            [this.KluboviLista[i].slika],
        });
        this.id = this.KluboviLista[i].id;

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
  
  public Nazad():any{this.router.navigate(['forme']);}




}
