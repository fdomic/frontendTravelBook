import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';

@Component({
  selector: 'app-dodaj-muzej-cijena',
  templateUrl: './dodaj-muzej-cijena.component.html',
  styleUrls: ['./dodaj-muzej-cijena.component.scss']
})
export class DodajMuzejCijenaComponent implements OnInit {


  public id ;
  public validateForm: FormGroup;
  public MuzejiCijenaLista: Array<any> = [];

  constructor( 
    private apiService: ApiService, 
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private ruta: ActivatedRoute ) {

      this.initForm();
      this.dohvatiPodatke();
      this.setId();
      this.NadiMuzejCijena();

  }

  


  private initForm(): void {
    
    this.validateForm = this.fb.group({
      id_muzeji:      ['', [Validators.required]],
      karta:          ['', [Validators.required]],
      opis:           ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena:         ['', [Validators.required]]
    });

  }

  private dohvatiPodatke(): void {
    
      this.apiService.dohvatiMuzejiCijena().subscribe(
        response => this.MuzejiCijenaLista = response.data,
        error => console.log(error)
      )

  }

  public setId(): void{ this.id = this.ruta.snapshot.params; }
  public onChange(result: Date): void { this.validateForm.value.godina_izgradnje = result;}
  public ngOnInit(): void {}

  
  // ========= HTML METODE =========


  public KreirajMuzejCijena(): any {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    
    return this.apiService.kreirajMuzejCijena(
      this.validateForm.value.id_muzeji,
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

  public AzurirajMuzejCijena(): any {

    return this.apiService.azurirajMuzejCijena(
      this.validateForm.value.id_muzeji,
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

  public NadiMuzejCijena(): void {

    for (const i in this.MuzejiCijenaLista) {
      if(this.MuzejiCijenaLista[i].id == this.id.id )  {
        this.validateForm = this.fb.group({
        id_muzeji:        [this.MuzejiCijenaLista[i].id_muzeji],
        karta:    [this.MuzejiCijenaLista[i].karta],
        opis:         [this.MuzejiCijenaLista[i].opis],
        trajanje_karte: [this.MuzejiCijenaLista[i].trajanje_karte],
        cijena:       [this.MuzejiCijenaLista[i].cijena],
        });
        this.id = this.MuzejiCijenaLista[i].id;

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
