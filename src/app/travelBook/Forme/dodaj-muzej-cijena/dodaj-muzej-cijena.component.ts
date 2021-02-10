import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';
import { MuzejiCijenaInterface } from 'src/app/interface/KreirajMuzejiCijenaInterface';

@Component({
  selector: 'app-dodaj-muzej-cijena',
  templateUrl: './dodaj-muzej-cijena.component.html',
  styleUrls: ['./dodaj-muzej-cijena.component.scss'],
})
export class DodajMuzejCijenaComponent implements OnInit {
  public id;
  public validateForm: FormGroup;
  public MuzejiCijenaLista: Array<MuzejiCijenaInterface> = [];

  public MuzejCijenaUcitavanje: boolean = false;
  public Uspjesno: boolean = false;

  public ValueVrijemTrajanja = 1;
  public formatterMIN = (value: number) => ` ${value} min`;
  public parserMIN = (value: string) => value.replace(' 1 min', '');

  public ValueCijena = 1;
  public formatterCijena = (value: number) => ` ${value} € `;
  public parserCijena = (value: string) => value.replace('1 €', '');

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

  public isNovaMuzejCijena(): boolean {
    return !!this.id;
  }

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_muzeji: ['', [Validators.required]],
      karta: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena: ['', [Validators.required]],
    });
  }

  private dohvatiPodatke(): void {
    this.apiService.dohvatiMuzejiCijena().subscribe(
      (response) => {
        this.MuzejiCijenaLista = response.data;
        if (this.isNovaMuzejCijena() === true) {
          this.NadiMuzejCijena();
        }
      },
      (error) => console.log(error)
    );
  }

  public setId(): void {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.MuzejCijenaUcitavanje = true;
    }
  }
  // ========= HTML METODE =========

  public KreirajMuzejCijena(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false)
      return console.log('Netocni podatci');

    return this.apiService
      .kreirajMuzejCijena(
        this.validateForm.value.id_muzeji,
        this.validateForm.value.karta,
        this.validateForm.value.opis,
        this.validateForm.value.trajanje_karte,
        this.validateForm.value.cijena
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

  public AzurirajMuzejCijena(): any {
    return this.apiService
      .azurirajMuzejCijena(
        this.validateForm.value.id_muzeji,
        this.validateForm.value.karta,
        this.validateForm.value.opis,
        this.validateForm.value.trajanje_karte,
        this.validateForm.value.cijena,
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

  public createMessage(type: string): void {
    if (type === 'success') {
      this.message.create(type, `Uspjesno `);
    } else {
      this.message.create(type, `Netočni podatci.Probajte ponovo.`);
    }
  }

  private popuniFormuIzModela(model: MuzejiCijenaInterface): void {
    this.validateForm.patchValue({
      id_muzeji: model.id_muzeji,
      karta: model.karta,
      opis: model.opis,
      trajanje_karte: model.trajanje_karte,
      cijena: model.cijena,
    });
  }

  // Pronadi sve podatke za zeljenu drzavu
  public NadiMuzejCijena(): any {
    let model = this.MuzejiCijenaLista.find(
      (muzej_cijena) => muzej_cijena.id === this.id
    );
    if (model) {
      this.popuniFormuIzModela(model);
      this.MuzejCijenaUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao Muzej !!!');
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
