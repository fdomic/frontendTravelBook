import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';
import { DvoracCijenaInterface } from 'src/app/interface/KreirajDvoracCijenaInterface';
import { DvoracInterface } from 'src/app/interface/KreirajDvoracInterface';

@Component({
  selector: 'app-dodaj-dvorci-cijena',
  templateUrl: './dodaj-dvorci-cijena.component.html',
  styleUrls: ['./dodaj-dvorci-cijena.component.scss'],
})
export class DodajDvorciCijenaComponent implements OnInit {
  public id;
  public validateForm: FormGroup;
  
  public DvorciLista: Array<DvoracInterface> = [];
  public DvorciCijenaLista: Array<DvoracCijenaInterface> = [];

  public DvorciCijenaUcitavanje: boolean = false;
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

  public isNoviDvoracCijena(): boolean {
    return !!this.id;
  }

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_dvorci: ['', [Validators.required]],
      karta: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena: ['', [Validators.required]],
    });
  }

  private dohvatiPodatke(): void {
    this.apiService.dohvatiDvorciCijena().subscribe(
      (response) => {
        this.DvorciCijenaLista = response.data;
        if (this.isNoviDvoracCijena() === true) {
          this.NadiDvorciCijena();
        }
      },
      (error) => console.log(error)
    );
  }

  public setId(): void {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.DvorciCijenaUcitavanje = true;
    }
  }

  // ========= HTML METODE =========

  public KreirajDvorciCijena(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false)
      return console.log('Netocni podatci');

    return this.apiService
      .kreirajDvorciCijena(
        this.validateForm.value.id_dvorci,
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

  public AzurirajDvorciCijena(): any {
    return this.apiService
      .azurirajDvorciCijena(
        this.validateForm.value.id_dvorci,
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

  private popuniFormuIzModela(model: DvoracCijenaInterface): void {
    this.validateForm.patchValue({
      id_dvorci: model.id_dvorci,
      karta: model.karta,
      opis: model.opis,
      trajanje_karte: model.trajanje_karte,
      cijena: model.cijena,
    });
  }

  // Pronadi sve podatke za zeljenu drzavu
  public NadiDvorciCijena(): any {
    let model = this.DvorciCijenaLista.find(
      (dvorci_cijena) => dvorci_cijena.id === this.id
    );
    if (model) {
      this.popuniFormuIzModela(model);
      this.DvorciCijenaUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao dvorci cijena !!!');
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
