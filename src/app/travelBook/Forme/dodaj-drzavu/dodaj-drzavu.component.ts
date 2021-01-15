import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";



@Component({
  selector: 'app-dodaj-drzavu',
  templateUrl: './dodaj-drzavu.component.html',
  styleUrls: ['./dodaj-drzavu.component.scss']
})
export class DodajDrzavuComponent implements OnInit {

  public id;
  public validateForm: FormGroup;
  public Drzave: Array<any> = [];

  constructor( 
    private apiService: ApiService,
    private fb: FormBuilder, 
    private router: Router,
    private message: NzMessageService ,
    private ruta: ActivatedRoute   ) {

      this.initForm();
      this.dohvatiPodatke();
      this.setId();
    
  }

  ngOnInit(): void {
  }

 
  private initForm(): void {
    this.validateForm = this.fb.group({
      naziv_drzave:      ['', [Validators.required]],
      glavni_grad:       ['', [Validators.required]],
      sluzbeni_jezik:    ['', [Validators.required]],
      predsjednik:       ['', [Validators.required]],
      predsjednik_vlade: ['', [Validators.required]],
      neovisnost:        ['', [Validators.required]],
      povrsina:          ['', [Validators.required]],
      stanovnistvo:      ['', [Validators.required]],
      valuta:            ['', [Validators.required]],
      pozivni_broj:      ['', [Validators.required]],
      slika:             ['', [Validators.required]],
      sluzbena_stranica: ['', [Validators.required]],
    });
  }

  private dohvatiPodatke(): void {
    
    
      this.apiService.dohvatiDrzavu().subscribe(
        response => this.Drzave = response.data,
  
        error => console.log(error)
      )
      
  }

  
  public setId():any{ this.id = this.ruta.snapshot.params; }

  // ========= HTML METODE =========


  // Spremi novu drzavu
  public submitFormKreirajDrzavu(): any {

    for (const i in this.Drzave) {
      if(this.Drzave[i].naziv_drzave === this.validateForm.value.naziv_drzave ) return  this.message.create("error", `Ova drzava vec postoji`);
      if(this.Drzave[i].glavni_grad === this.validateForm.value.glavni_grad ) return this.message.create("error", `Ovaj grad vec postoji`);
    }
    
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    
    return this.apiService.kreirajDrzavu(
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

   // Azuriraj novu drzavu
  public submitFormAzurirajDrzavu(): any {
  
    return this.apiService.azurirajDrzavu(
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

  // Pronadi sve podatke za zeljenu drzavu
  public submitFormNadiDrzavu(): any {

    for (const i in this.Drzave) {
      if(this.Drzave[i].id == this.id.id)  {
        
        this.validateForm = this.fb.group({
          naziv_drzave:      [this.Drzave[i].naziv_drzave],
          glavni_grad:       [this.Drzave[i].glavni_grad ],
          sluzbeni_jezik:    [this.Drzave[i].sluzbeni_jezik],
          predsjednik:       [this.Drzave[i].predsjednik],
          predsjednik_vlade: [this.Drzave[i].predsjednik_vlade],
          neovisnost:        [this.Drzave[i].neovisnost],
          povrsina:          [this.Drzave[i].povrsina],
          stanovnistvo:      [this.Drzave[i].stanovnistvo],
          valuta:            [this.Drzave[i].valuta],
          pozivni_broj:      [this.Drzave[i].pozivni_broj],
          slika:             [this.Drzave[i].slika],
          sluzbena_stranica: [this.Drzave[i].sluzbena_stranica,],
        });

        this.id = this.Drzave[i].id;
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


  
  

  //---------Vracanje-------

  forma(){
    
    this.router.navigate(['forme']);
  }

}
