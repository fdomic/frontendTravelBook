import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DrzavaInterface } from 'src/app/interface/KreirajDrzavuInterface';

@Component({
  selector: 'app-dodaj-drzavu',
  templateUrl: './dodaj-drzavu.component.html',
  styleUrls: ['./dodaj-drzavu.component.scss'],
})
export class DodajDrzavuComponent implements OnInit {
  public id: number;
  public validateForm: FormGroup;
  public DrzaveLista: Array<DrzavaInterface> = [];
  public DrzaveUcitavanje: boolean = false;
  public Uspjesno: boolean = false;

  public ValueStanovnistvo = 0;

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
    this.dohvatiPodatke();
    this.setId();
  }

  ngOnInit(): void {
    this.setId();
  }

  public onChange(result: Date): void {
    this.validateForm.value.updated_at = result;
  }

  public isNovaDrzava(): boolean {
    return !!this.id;
  }

  // ========= FORMA =========

  private initForm(): void {
    this.validateForm = this.fb.group({
      naziv_drzave: ['', [Validators.required]],
      glavni_grad: ['', [Validators.required]],
      sluzbeni_jezik: ['', [Validators.required]],
      predsjednik: ['', [Validators.required]],
      predsjednik_vlade: ['', [Validators.required]],
      neovisnost: ['', [Validators.required]],
      povrsina: ['', [Validators.required]],
      stanovnistvo: ['', [Validators.required]],
      valuta: ['', [Validators.required]],
      pozivni_broj: ['', [Validators.required]],
      slika: ['', [Validators.required]],
      sluzbena_stranica: ['', [Validators.required]],
    });
  }

  // ========= PRIPREMA PODATAKA =========

  private dohvatiPodatke(): void {
    this.apiService.dohvatiDrzavu().subscribe(
      (response) => {
        this.DrzaveLista = response.data;
        if (this.isNovaDrzava() === true) {
          this.NadiDrzavu();
        }
      },

      (error) => console.log(error)
    );
  }

  public setId(): any {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.DrzaveUcitavanje = true;
    }
  }

  // ========= HTML METODE =========

  // Spremi novu drzavu
  public KreirajDrzavu(): any {
    for (const i in this.DrzaveLista) {
      if (
        this.DrzaveLista[i].naziv_drzave === this.validateForm.value.naziv_drzave
      )
        return this.message.create('error', `Ova drzava vec postoji`);
      if (
        this.DrzaveLista[i].glavni_grad === this.validateForm.value.glavni_grad
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
      .kreirajDrzavu(
        this.validateForm.value.naziv_drzave,
        this.validateForm.value.glavni_grad,
        this.validateForm.value.sluzbeni_jezik,
        this.validateForm.value.predsjednik,
        this.validateForm.value.predsjednik_vlade,
        this.validateForm.value.neovisnost,
        this.validateForm.value.povrsina,
        this.validateForm.value.stanovnistvo,
        this.validateForm.value.valuta,
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

  // Azuriraj novu drzavu
  public AzurirajDrzavu(): any {
    return this.apiService
      .azurirajDrzavu(
        this.validateForm.value.naziv_drzave,
        this.validateForm.value.glavni_grad,
        this.validateForm.value.sluzbeni_jezik,
        this.validateForm.value.predsjednik,
        this.validateForm.value.predsjednik_vlade,
        this.validateForm.value.neovisnost,
        this.validateForm.value.povrsina,
        this.validateForm.value.stanovnistvo,
        this.validateForm.value.valuta,
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

  // Pronadi sve podatke za zeljenu drzavu

  private popuniFormuIzModela(model: DrzavaInterface): void {
    this.validateForm.patchValue({

      naziv_drzave: model.naziv_drzave ,
      glavni_grad: model.glavni_grad ,
      sluzbeni_jezik: model.sluzbeni_jezik ,
      predsjednik: model.predsjednik ,
      predsjednik_vlade: model.predsjednik_vlade ,
      neovisnost: model.neovisnost ,
      povrsina: model.povrsina ,
      stanovnistvo: model.stanovnistvo ,
      valuta: model.valuta ,
      pozivni_broj: model.pozivni_broj ,
      slika: model.slika ,
      sluzbena_stranica: model.sluzbena_stranica ,

    });
  }

  
  public NadiDrzavu(): any {
    let model = this.DrzaveLista.find((drzavu) => drzavu.id === this.id);
    if (model) {
      this.popuniFormuIzModela(model);
      this.DrzaveUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao drzavu!!!');
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
