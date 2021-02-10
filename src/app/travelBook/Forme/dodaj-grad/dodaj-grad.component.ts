import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GradInterface } from 'src/app/interface/KreirajGradInterface';
import { DrzavaInterface } from 'src/app/interface/KreirajDrzavuInterface';

@Component({
  selector: 'app-dodaj-grad',
  templateUrl: './dodaj-grad.component.html',
  styleUrls: ['./dodaj-grad.component.scss'],
})
export class DodajGradComponent implements OnInit {
  public id: number;
  public validateForm: FormGroup;
  public GradoviLista: Array<GradInterface> = [];
  public DrzavaLista: Array<DrzavaInterface> = [];
  public GradsUcitavanje: boolean = false;
  public Uspjesno: boolean = false;

  public ValueStanovnistvo = 0;
  public ValuePostanski_broj = 0;
  
  public ValueNadmorska_visina = 0;
  public formatterM = (value: number) => ` ${value} m `;
  public parserM = (value: string) => value.replace('m', '');

  public ValuePovrsina = 0;
  public formatterKM = (value: number) => ` ${value} km^2`;
  public parserKM = (value: string) => value.replace('km^2', '');

  public ValuePozivnoBr = 0;
  public formatterPlus = (value: number) => `+ ${value}`;
  public parserPlus = (value: string) => value.replace('+', '');

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private ruta: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.setId();
    this.dohvatiPodatke();
  }

  public onChange(result: Date): void {
    this.validateForm.value.updated_at = result;
  }

  public isNoviGrad(): boolean {
    return !!this.id;
  }

  // ========= FORMA =========

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_drzave: ['', [Validators.required]],
      naziv_grada: ['', [Validators.required]],
      gradonacelnik: ['', [Validators.required]],
      povrsina: ['', [Validators.required]],
      nadmorska_visina: ['', [Validators.required]],
      stanovnistvo: ['', [Validators.required]],
      postanski_broj: ['', [Validators.required]],
      pozivni_broj: ['', [Validators.required]],
      slika: ['', [Validators.required]],
      sluzbena_stranica: ['', [Validators.required]],
    });
  }

  // ========= PRIPREMA PODATAKA =========

  private dohvatiPodatke(): void {
    this.apiService.dohvatiGrad().subscribe(
      (response) => {
        this.GradoviLista = response.data;
        if (this.isNoviGrad() === true) {
          this.NadiGrad();
        }
      },
      (error) => console.log(error)
    );

    this.apiService.dohvatiDrzavu().subscribe(
      (response) => (this.DrzavaLista = response.data),
      (error) => console.log(error)
    );
  }

  public setId(): any {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.GradsUcitavanje = true;
    }
  }

  // ========= HTML METODE =========

  // Spremi novu drzavu
  public KreirajGrad(): any {
    for (const i in this.GradoviLista) {
      if (
        this.GradoviLista[i].naziv_grada === this.validateForm.value.naziv_grada
      )
        return this.message.create('error', `Ovaj grad vec postoji`);
    }

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false)
      return console.log('Netocni podatci');

    return this.apiService
      .kreirajGrad(
        this.validateForm.value.id_drzave,
        this.validateForm.value.naziv_grada,
        this.validateForm.value.gradonacelnik,
        this.validateForm.value.povrsina,
        this.validateForm.value.nadmorska_visina,
        this.validateForm.value.stanovnistvo,
        this.validateForm.value.postanski_broj,
        this.validateForm.value.pozivni_broj,
        this.validateForm.value.slika,
        this.validateForm.value.sluzbena_stranica
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

  // Azuriraj novu grad
  public AzurirajGrad(): any {
    return this.apiService
      .azurirajGrad(
        this.validateForm.value.id_drzave,
        this.validateForm.value.naziv_grada,
        this.validateForm.value.gradonacelnik,
        this.validateForm.value.nadmorska_visina,
        this.validateForm.value.povrsina,
        this.validateForm.value.stanovnistvo,
        this.validateForm.value.postanski_broj,
        this.validateForm.value.pozivni_broj,
        this.validateForm.value.slika,
        this.validateForm.value.sluzbena_stranica,
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

  private popuniFormuIzModela(model: GradInterface): void {
    this.validateForm.patchValue({
      id_drzave: model.id_drzave,
      naziv_grada: model.naziv_grada,
      gradonacelnik: model.gradonacelnik,
      nadmorska_visina: model.nadmorska_visina,
      povrsina: model.povrsina,
      stanovnistvo: model.stanovnistvo,
      postanski_broj: model.postanski_broj,
      pozivni_broj: model.pozivni_broj,
      slika: model.slika,
      sluzbena_stranica: model.sluzbena_stranica,
    });
  }

  // Pronadi sve podatke za zeljenu drzavu
  public NadiGrad(): any {
    let model = this.GradoviLista.find((grad) => grad.id === this.id);
    if (model) {
      this.popuniFormuIzModela(model);
      this.GradsUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao grad!!!');
    }
  }

  // ========= PORUKA =========

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
