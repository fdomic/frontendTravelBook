import { Component, OnInit } from '@angular/core';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { KazalistaInterface } from 'src/app/interface/KreirajKazalistaInterface';

@Component({
  selector: 'app-dodaj-kazalista',
  templateUrl: './dodaj-kazalista.component.html',
  styleUrls: ['./dodaj-kazalista.component.scss'],
})
export class DodajKazalistaComponent implements OnInit {
  public id;
  public validateForm: FormGroup;
  public KazalistaLista: Array<KazalistaInterface> = [];

  public KazalistaUcitavanje: boolean = false;
  public Uspjesno: boolean = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private ruta: ActivatedRoute
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.setId();
    this.dohvatiPodatke();
  }

  public onChange(result: Date): void {
    this.validateForm.value.updated_at = result;
  }

  public isNovoKazaliste(): boolean {
    return !!this.id;
  }

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_grada: ['', [Validators.required]],
      ime_gradevine: ['', [Validators.required]],
      arhitekt: ['', [Validators.required]],
      godina_izgradnje: ['', [Validators.required]],
      opis_kraci: ['', [Validators.required]],
      opis_duzi: ['', [Validators.required]],
      adresa: ['', [Validators.required]],
      sluzbena_stranica: ['', [Validators.required]],
      slika: ['', [Validators.required]],
    });
  }

  private dohvatiPodatke(): void {
    this.apiService.dohvatiKazalista().subscribe(
      (response) => {
        this.KazalistaLista = response.data;
        if (this.isNovoKazaliste() === true) {
          this.NadiKazaliste();
        }
      },

      (error) => console.log(error)
    );
  }

  public setId(): void {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.KazalistaUcitavanje = true;
    }
  }

  // ========= HTML METODE =========

  public KreirajKazaliste(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false)
      return console.log('Netocni podatci');

    return this.apiService
      .kreirajKazaliste(
        this.validateForm.value.id_grada,
        this.validateForm.value.ime_gradevine,
        this.validateForm.value.arhitekt,
        this.validateForm.value.godina_izgradnje,
        this.validateForm.value.opis_kraci,
        this.validateForm.value.opis_duzi,
        this.validateForm.value.adresa,
        this.validateForm.value.sluzbena_stranica,
        this.validateForm.value.slika
      )
      .subscribe(
        (response) => {
          if (response) {
            console.log(this.validateForm.value);
            this.Uspjesno = true;
            this.dohvatiPodatke();
            this.initForm();
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
  }

  public AzurirajKazaliste(): any {
    return this.apiService
      .azurirajKazaliste(
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
      )
      .subscribe(
        (response) => {
          if (response) {
            console.log(this.validateForm.value);
            this.Uspjesno = true;
            this.dohvatiPodatke();
            this.initForm();
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
  }

  private popuniFormuIzModela(model: KazalistaInterface): void {
    this.validateForm.patchValue({
      id_grada: model.id_grada,
      ime_gradevine: model.ime_gradevine,
      arhitekt: model.arhitekt,
      godina_izgradnje: model.godina_izgradnje,
      opis_kraci: model.opis_kraci,
      opis_duzi: model.opis_duzi,
      adresa: model.adresa,
      sluzbena_stranica: model.sluzbena_stranica,
      slika: model.slika,
    });
  }

  public NadiKazaliste(): void {
    let model = this.KazalistaLista.find(
      (kazaliste) => kazaliste.id === this.id
    );
    if (model) {
      this.popuniFormuIzModela(model);
      this.KazalistaUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao kazaliste!!!');
    }
  }

  public createMessage(type: string): void {
    if (type === 'success') {
      this.message.create(type, `Uspjesno `);
    } else {
      this.message.create(type, `Netočni podatci.Probajte ponovo.`);
    }
  }

  // ========= VRACANJE =========

  public Nazad(): any {
    this.router.navigate(['forme']);
  }
  public Forma(): any {
    this.Uspjesno = false;
  }
}
