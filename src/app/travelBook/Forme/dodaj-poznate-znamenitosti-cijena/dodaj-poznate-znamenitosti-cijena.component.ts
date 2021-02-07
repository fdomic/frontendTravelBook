import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';

@Component({
  selector: 'app-dodaj-poznate-znamenitosti-cijena',
  templateUrl: './dodaj-poznate-znamenitosti-cijena.component.html',
  styleUrls: ['./dodaj-poznate-znamenitosti-cijena.component.scss']
})
export class DodajPoznateZnamenitostiCijenaComponent implements OnInit {

  
  public id ;
  public validateForm: FormGroup;
  public PotnateZnamenitostiCijenaLista: Array<any> = [];


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
      this.dohvatiPodatke();
      this.setId();

  }

  private initForm(): void {
    
    this.validateForm = this.fb.group({
      id_poznate_znamenitosti: ['', [Validators.required]],
      karta:          ['', [Validators.required]],
      opis:           ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena:         ['', [Validators.required]]
    });

  }

  private dohvatiPodatke(): void {
    
      this.apiService.dohvatiPoznatuZnamenitostCijena().subscribe(
        response => this.PotnateZnamenitostiCijenaLista = response.data,
        error => console.log(error)
      )

  }

  public setId(): void{ this.id = this.ruta.snapshot.params; }
  public onChange(result: Date): void { this.validateForm.value.godina_izgradnje = result;}
  public ngOnInit(): void {}

  
  // ========= HTML METODE =========


  public KreirajPotnateZnamenitostiCijena(): any {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    
    return this.apiService.kreirajPoznatuZnamenitostCijena(
      this.validateForm.value.id_poznate_znamenitosti,
      this.validateForm.value.karta,
      this.validateForm.value.opis,
      this.validateForm.value.trajanje_karte,
      this.validateForm.value.cijena
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

  public AzurirajPotnateZnamenitostiCijena(): any {

    return this.apiService.azurirajPoznatuZnamenitostCijena(
      this.validateForm.value.id_poznate_znamenitosti,
      this.validateForm.value.karta,
      this.validateForm.value.opis,
      this.validateForm.value.trajanje_karte,
      this.validateForm.value.cijena,
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

  public NadiPotnateZnamenitostiCijena(): void {

    for (const i in this.PotnateZnamenitostiCijenaLista) {
      if(this.PotnateZnamenitostiCijenaLista[i].id == this.id.id )  {
        this.validateForm = this.fb.group({
        id_poznate_znamenitosti: [this.PotnateZnamenitostiCijenaLista[i].id_poznate_znamenitosti],
        karta:                   [this.PotnateZnamenitostiCijenaLista[i].karta],
        opis:                    [this.PotnateZnamenitostiCijenaLista[i].opis],
        trajanje_karte:          [this.PotnateZnamenitostiCijenaLista[i].trajanje_karte],
        cijena:                  [this.PotnateZnamenitostiCijenaLista[i].cijena],
        });
        this.id = this.PotnateZnamenitostiCijenaLista[i].id;

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
