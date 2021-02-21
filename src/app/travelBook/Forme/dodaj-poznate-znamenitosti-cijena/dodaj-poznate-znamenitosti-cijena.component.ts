import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';
import { PoznatuZnamenitostCijenaInterface } from 'src/app/interface/KreirajPoznatuZnamenitostCijenaInterface';
import { PoznatuZnamenitostInterface } from 'src/app/interface/KreirajPoznatuZnamenitostInterface';

@Component({
  selector: 'app-dodaj-poznate-znamenitosti-cijena',
  templateUrl: './dodaj-poznate-znamenitosti-cijena.component.html',
  styleUrls: ['./dodaj-poznate-znamenitosti-cijena.component.scss'],
})
export class DodajPoznateZnamenitostiCijenaComponent implements OnInit {
  public id;
  public validateForm: FormGroup;
  public PoznataZnamenitostLista : Array<PoznatuZnamenitostInterface>
  public PotnateZnamenitostiCijenaLista: Array<PoznatuZnamenitostCijenaInterface> = [];

  public PoznateZnamenitostiCijenaUcitavanje: boolean = false;
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

  public isNovaPoznataZnamenitostCijena(): boolean {
    return !!this.id;
  }

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_poznate_znamenitosti: ['', [Validators.required]],
      karta: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena: ['', [Validators.required]],
    });
  }

  private dohvatiPodatke(): void {


    this.apiService.dohvatiPoznatuZnamenitost().subscribe(
      (response) => {
        this.PoznataZnamenitostLista = response.data;
        
      },
      (error) => console.log(error)
    );

    this.apiService.dohvatiPoznatuZnamenitostCijena().subscribe(
      (response) => {
        this.PotnateZnamenitostiCijenaLista = response.data;
        if (this.isNovaPoznataZnamenitostCijena() === true) {
          this.NadiPotnateZnamenitostiCijena();
        }
      },
      (error) => console.log(error)
    );
  }

  public setId(): void {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.PoznateZnamenitostiCijenaUcitavanje = true;
    }
  }

  // ========= HTML METODE =========

  public KreirajPotnateZnamenitostiCijena(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false)
      return console.log('Netocni podatci');

    return this.apiService
      .kreirajPoznatuZnamenitostCijena(
        this.validateForm.value.id_poznate_znamenitosti,
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

  public AzurirajPotnateZnamenitostiCijena(): any {
    return this.apiService
      .azurirajPoznatuZnamenitostCijena(
        this.validateForm.value.id_poznate_znamenitosti,
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

  private popuniFormuIzModela(model: PoznatuZnamenitostCijenaInterface): void {
    this.validateForm.patchValue({
      id_poznate_znamenitosti: model.id_poznate_znamenitosti,
      karta: model.karta,
      opis: model.opis,
      trajanje_karte: model.trajanje_karte,
      cijena: model.cijena,
    });
  }

  // Pronadi sve podatke za zeljenu drzavu
  public NadiPotnateZnamenitostiCijena(): any {
    let model = this.PotnateZnamenitostiCijenaLista.find(
      (poznataZnamenitost_cijena) => poznataZnamenitost_cijena.id === this.id
    );
    if (model) {
      this.popuniFormuIzModela(model);
      this.PoznateZnamenitostiCijenaUcitavanje = false;
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
