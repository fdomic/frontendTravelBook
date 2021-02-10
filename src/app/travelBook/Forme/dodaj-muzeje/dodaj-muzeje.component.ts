import { Component, OnInit } from '@angular/core';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MuzejInterface } from 'src/app/interface/KreirajMuzejInterface';

@Component({
  selector: 'app-dodaj-muzeje',
  templateUrl: './dodaj-muzeje.component.html',
  styleUrls: ['./dodaj-muzeje.component.scss'],
})
export class DodajMuzejeComponent implements OnInit {
  public id;
  public validateForm: FormGroup;
  public MuzejiLista: Array<MuzejInterface> = [];

  public MuzejUcitavanje: boolean = false;
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

  public isNovaMuzej(): boolean {
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
    this.apiService.dohvatiMuzeje().subscribe(
      (response) => {
        this.MuzejiLista = response.data;
        if (this.isNovaMuzej() === true) {
          this.NadiMuzej();
        }
      },

      (error) => console.log(error)
    );
  }

  public setId(): void {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.MuzejUcitavanje = true;
    }
  }

  // ========= HTML METODE =========

  public KreirajMuzej(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false)
      return console.log('Netocni podatci');

    return this.apiService
      .kreirajMuzej(
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

  public AzurirajMuzej(): any {
    return this.apiService
      .azurirajMuzej(
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

  private popuniFormuIzModela(model: MuzejInterface): void {
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

  // Pronadi sve podatke za zeljenu drzavu
  public NadiMuzej(): any {
    let model = this.MuzejiLista.find((muzej) => muzej.id === this.id);
    if (model) {
      this.popuniFormuIzModela(model);
      this.MuzejUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao grad!!!');
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
  public Forma(): any {
    this.Uspjesno = false;
  }

  public Nazad(): any {
    this.router.navigate(['forme']);
  }
}
