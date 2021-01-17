import { Component, OnInit } from '@angular/core';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";


@Component({
  selector: 'app-dodaj-kazalista',
  templateUrl: './dodaj-kazalista.component.html',
  styleUrls: ['./dodaj-kazalista.component.scss']
})
export class DodajKazalistaComponent implements OnInit {

  public id ;
  public validateForm: FormGroup;
  public KazalistaLista: Array<any> = [];

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
    
      this.apiService.dohvatiKazalista().subscribe(
        response => this.KazalistaLista = response.data,
        error => console.log(error)
      )

  }

  public setId(): void{ this.id = this.ruta.snapshot.params; }
  public onChange(result: Date): void { this.validateForm.value.godina_izgradnje = result;
  }
  public ngOnInit(): void {}

  
  // ========= HTML METODE =========


  public KreirajKazaliste(): any {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    
    return this.apiService.kreirajKazaliste(
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

  public AzurirajKazaliste(): any {

    return this.apiService.azurirajKazaliste(
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

  public NadiKazaliste(): void {

    for (const i in this.KazalistaLista) {
      if(this.KazalistaLista[i].id == this.id.id )  {
        this.validateForm = this.fb.group({
        id_grada:         [this.KazalistaLista[i].id_grada],
        ime_gradevine:    [this.KazalistaLista[i].ime_gradevine],
        arhitekt:         [this.KazalistaLista[i].arhitekt],
        godina_izgradnje: [this.KazalistaLista[i].godina_izgradnje],
        opis_kraci:       [this.KazalistaLista[i].opis_kraci],
        opis_duzi:        [this.KazalistaLista[i].opis_duzi],
        adresa:           [this.KazalistaLista[i].adresa],
        sluzbena_stranica:[this.KazalistaLista[i].sluzbena_stranica],
        slika:            [this.KazalistaLista[i].slika],
        });
        this.id = this.KazalistaLista[i].id;

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
