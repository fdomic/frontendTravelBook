import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';
import { KlubCijenaInterface } from 'src/app/interface/KreirajKlubCijenaInterface';
import { KluboviInterface } from 'src/app/interface/KreirajKlubInterface';

@Component({
  selector: 'app-dodaj-klub-cijena',
  templateUrl: './dodaj-klub-cijena.component.html',
  styleUrls: ['./dodaj-klub-cijena.component.scss'],
})
export class DodajKlubCijenaComponent implements OnInit {
  public id;
  public validateForm: FormGroup;
  
  public KluboviLista: Array<KluboviInterface> = [];
  public KluboviCijenaLista: Array<KlubCijenaInterface> = [];

  public KluboviCijenaUcitavanje: boolean = false;
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

  public isNovaKlubCijena(): boolean {
    return !!this.id;
  }

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_klubovi: ['', [Validators.required]],
      karta: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena: ['', [Validators.required]],
    });
  }

  private dohvatiPodatke(): void {

    this.apiService.dohvatiKlubove().subscribe(
      (response) => {
        this.KluboviLista = response.data;
      },
      (error) => console.log(error)
    );



    this.apiService.dohvatiKluboviCijena().subscribe(
      (response) => {
        this.KluboviCijenaLista = response.data;
        if (this.isNovaKlubCijena() === true) {
          this.NadiKlubCijena();
        }
      },
      (error) => console.log(error)
    );
  }

  public setId(): void {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.KluboviCijenaUcitavanje = true;
    }
  }
  // ========= HTML METODE =========

  public KreirajKlubCijena(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false)
      return console.log('Netocni podatci');

    return this.apiService
      .kreirajKlubCijena(
        this.validateForm.value.id_klubovi,
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

  public AzurirajKlubCijena(): any {
    return this.apiService
      .azurirajKlubCijena(
        this.validateForm.value.id_klubovi,
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

  private popuniFormuIzModela(model: KlubCijenaInterface): void {
    this.validateForm.patchValue({
      id_klubovi: model.id_klubovi,
      karta: model.karta,
      opis: model.opis,
      trajanje_karte: model.trajanje_karte,
      cijena: model.cijena,
    });
  }

  public NadiKlubCijena(): any {
    let model = this.KluboviCijenaLista.find(
      (klub_cijena) => klub_cijena.id === this.id
    );
    if (model) {
      this.popuniFormuIzModela(model);
      this.KluboviCijenaUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao klub cijenu!!!');
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
