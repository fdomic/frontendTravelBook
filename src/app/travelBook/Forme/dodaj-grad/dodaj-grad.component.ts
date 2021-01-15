import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";



@Component({
  selector: 'app-dodaj-grad',
  templateUrl: './dodaj-grad.component.html',
  styleUrls: ['./dodaj-grad.component.scss']
})
export class DodajGradComponent implements OnInit {

  public id ;
  public validateForm: FormGroup;
  public Gradovi: Array<any> = [];
  public Drzave: Array<any> = [];

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

  ngOnInit(): void {
    
  }

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_drzave:        ['1', [Validators.required]],
      naziv_grada:      ['1', [Validators.required]],
      gradonacelnik:    ['1', [Validators.required]],
      povrsina:         ['1', [Validators.required]],
      nadmorska_visina: ['1', [Validators.required]],
      stanovnistvo:     ['1', [Validators.required]],
      postanski_broj:   ['1', [Validators.required]],
      pozivni_broj:     ['1', [Validators.required]],
      slika:            ['1', [Validators.required]],
      kordinate:        ['1', [Validators.required]],
    });

  }

  private dohvatiPodatke(): void {
    
      this.apiService.dohvatiGrad().subscribe(
        response => this.Gradovi = response.data,
        error => console.log(error)
      )

      this.apiService.dohvatiDrzavu().subscribe(
        response => this.Drzave = response.data,
        error => console.log(error)
      )
      
  }

  public setId():any{ this.id = this.ruta.snapshot.params; }

  // ========= HTML METODE =========

  // Spremi novu drzavu
  public submitFormKreirajGrad(): any {

    for (const i in this.Gradovi) {
      if(this.Gradovi[i].naziv_grada === this.validateForm.value.naziv_grada ) return this.message.create("error", `Ovaj grad vec postoji`);
    }
    
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid === false) return console.log("Netocni podatci")
    

    return this.apiService.kreirajGrad(
      this.validateForm.value.id_drzave,
      this.validateForm.value.naziv_grada,
      this.validateForm.value.gradonacelnik,
      this.validateForm.value.povrsina,
      this.validateForm.value.nadmorska_visina,
      this.validateForm.value.stanovnistvo,
      this.validateForm.value.postanski_broj,
      this.validateForm.value.pozivni_broj,
      this.validateForm.value.slika,
      this.validateForm.value.kordinate,
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

   // Azuriraj novu grad
  public submitFormAzurirajGrad(): any {

    return this.apiService.azurirajGrad(
      this.validateForm.value.id_drzave,
      this.validateForm.value.naziv_grada,
      this.validateForm.value.gradonacelnik,
      this.validateForm.value.nadmorska_visina,
      this.validateForm.value.povrsina,
      this.validateForm.value.stanovnistvo,
      this.validateForm.value.postanski_broj,
      this.validateForm.value.pozivni_broj,
      this.validateForm.value.slika,
      this.validateForm.value.kordinate,
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

  // Obrisi drzavu
  public submitFormObrisiDrzavu():any{

    for (const i in this.Gradovi) {
      if(this.Gradovi[i].naziv_grada === this.validateForm.value.naziv_grada )  {
        return this.apiService.obrisiGrad(this.Gradovi[i].id).subscribe(response => {
            if(response ) {
              console.log(this.validateForm.value);
              this.createMessage("success" );
              this.dohvatiPodatke();
              this.initForm();
              this.router.navigate(['forme']);
            }
          },
          error => console.log(error,this.createMessage("error"))
        );
      }
    }
  }


  // Pronadi sve podatke za zeljenu drzavu
  public submitFormNadiGrad(): any {

    for (const i in this.Gradovi) {
      if(this.Gradovi[i].id == this.id.id )  {
        this.validateForm = this.fb.group({
        id_drzave:        [this.Gradovi[i].id_drzave],
        naziv_grada:      [this.Gradovi[i].naziv_grada],
        gradonacelnik:    [this.Gradovi[i].gradonacelnik],
        nadmorska_visina: [this.Gradovi[i].nadmorska_visina],
        povrsina:         [this.Gradovi[i].povrsina],
        stanovnistvo:     [this.Gradovi[i].stanovnistvo],
        postanski_broj:   [this.Gradovi[i].postanski_broj],
        pozivni_broj:     [this.Gradovi[i].pozivni_broj],
        slika:            [this.Gradovi[i].slika],
        kordinate:        [this.Gradovi[i].kordinate]
        });
        this.id = this.Gradovi[i].id;

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
