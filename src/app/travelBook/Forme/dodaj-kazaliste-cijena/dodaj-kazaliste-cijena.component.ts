import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';
import { KazalisteCijenaInterface } from 'src/app/interface/KreirajKazalistaCijenaInterface';
import { KazalistaInterface } from 'src/app/interface/KreirajKazalistaInterface';

@Component({
  selector: 'app-dodaj-kazaliste-cijena',
  templateUrl: './dodaj-kazaliste-cijena.component.html',
  styleUrls: ['./dodaj-kazaliste-cijena.component.scss']
})
export class DodajKazalisteCijenaComponent implements OnInit {

 
  public id ;
  public validateForm: FormGroup;
  
  public KazalisteLista: Array<KazalistaInterface> = [];
  public KazalisteCijenaLista: Array<KazalisteCijenaInterface> = [];

  public KazalistaCijenaUcitavanje: boolean = false;
  public Uspjesno: boolean = false;

  public ValueVrijemTrajanja = 1;
  public formatterMIN = (value: number) => ` ${value} min`;
  public parserMIN = (value: string) => value.replace(' 1 min', ''  ) ;

  public ValueCijena = 1;
  public formatterCijena = (value: number) => ` ${value} € `;
  public parserCijena = (value: string) => value.replace('1 €', '');

  constructor( 
    private apiService: ApiService, 
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private ruta: ActivatedRoute ) {

      this.initForm();
  }

  public ngOnInit(): void {
    this.setId();
    this.dohvatiPodatke();
  }

  public onChange(result: Date): void {
    this.validateForm.value.updated_at = result;
  }

  public isNovoKazalisteCijena(): boolean {
    return !!this.id;
  }


  private initForm(): void {
    
    this.validateForm = this.fb.group({
      id_kazalista:   ['', [Validators.required]],
      karta:          ['', [Validators.required]],
      opis:           ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena:         ['', [Validators.required]]
    });

  }

  private dohvatiPodatke(): void {

    
    this.apiService.dohvatiKazalista().subscribe(
      (response) => {
        this.KazalisteLista = response.data;
      },
      (error) => console.log(error)
    );

    
      this.apiService.dohvatiKazalistaCijena().subscribe(

        (response) => {
          this.KazalisteCijenaLista = response.data;
          if (this.isNovoKazalisteCijena() === true) {
            this.NadiKazalisteCijena();
          }
        },
        error => console.log(error)
      )

  }

  public setId(): void {
    if (this.ruta.snapshot.params.id) {
      this.id = parseInt(this.ruta.snapshot.params.id);
      this.KazalistaCijenaUcitavanje = true;
    }
  }
  
  // ========= HTML METODE =========


  public KreirajKazalisteCijena(): any {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    
    return this.apiService.kreirajKazalisteCijena(
      this.validateForm.value.id_kazalista,
      this.validateForm.value.karta,
      this.validateForm.value.opis,
      this.validateForm.value.trajanje_karte,
      this.validateForm.value.cijena
      ).subscribe(response => {
        if(response ) {
          console.log(this.validateForm.value);
          this.Uspjesno = true;
          this.dohvatiPodatke();
          this.initForm();
        }
      },
      error => console.log(error,this.createMessage("error"))
    );

  }

  public AzurirajKazalisteCijena(): any {

    return this.apiService.azurirajKazalisteCijena(
      this.validateForm.value.id_kazalista,
      this.validateForm.value.karta,
      this.validateForm.value.opis,
      this.validateForm.value.trajanje_karte,
      this.validateForm.value.cijena,
      this.id
      ).subscribe(response => {
        if(response ) {
          console.log(this.validateForm.value);
          this.Uspjesno = true;
          this.dohvatiPodatke();
          this.initForm();
        }
      },
      error => console.log(error,this.createMessage("error"))
    );

  }

  private popuniFormuIzModela(model: KazalisteCijenaInterface): void {
    this.validateForm.patchValue({
      id_kazalista: model.id_kazalista,
      karta: model.karta,
      opis: model.opis,
      trajanje_karte: model.trajanje_karte,
      cijena: model.cijena,
    });
  }

  // Pronadi sve podatke 
  public NadiKazalisteCijena(): any {
    let model = this.KazalisteCijenaLista.find(
      (kazaliste_cijena) => kazaliste_cijena.id === this.id
    );
    if (model) {
      this.popuniFormuIzModela(model);
      this.KazalistaCijenaUcitavanje = false;
    } else {
      console.log('[ERROR] Nisam pronašao kazaliste cijena !!!');
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

 
  public Forma(): any {
    this.Uspjesno = false;
  }


  
}
