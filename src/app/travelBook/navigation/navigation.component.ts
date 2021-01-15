import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],

  
})
export class NavigationComponent implements OnInit {

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;}

  
    public id;
    public validateForm: FormGroup;
    
    public gradForm: FormGroup;
    public Gradovi: Array<any> = [];
  
    constructor( private apiService: ApiService, private fb: FormBuilder, private router: Router, private message: NzMessageService   ) {
      this.initForm();
      this.dohvatiPodatke();
      
    }
  
    ngOnInit(): void {
    }

   
  
    private initForm(): void {
      this.validateForm = this.fb.group({
        id_drzave:        ['', [Validators.required]],
        naziv_grada:      ['', [Validators.required]],
        gradonacelnik:    ['', [Validators.required]],
        nadmorska_visina: ['', [Validators.required]],
        povrsina:         ['', [Validators.required]],
        stanovnistvo:     ['', [Validators.required]],
        postanski_broj:   ['', [Validators.required]],
        slika:            ['', [Validators.required]],
        kordinate:        ['', [Validators.required]],
      });

      this.gradForm = this.fb.group({
        grad_naziv:        ['London'],
      });
  
    }
    private dohvatiPodatke(): void {
    
    
      this.apiService.dohvatiGrad().subscribe(
        response => this.Gradovi = response.data,
  
        error => console.log(error)
      )
      
  }
  
    // Pronadi sve podatke za zeljenu drzavu
    // Pronadi sve podatke za zeljenu drzavu
  public submitFormNadiGrad(): any {

    console.log(this.gradForm.value.grad_naziv,"ovo radi")

    for (const i in this.Gradovi) {
      if(this.Gradovi[i].naziv_grada === this.gradForm.value.grad_naziv )  {
        
        this.validateForm = this.fb.group({
        id_drzave:        [this.Gradovi[i].id_drzave],
        naziv_grada:      [this.Gradovi[i].naziv_grada],
        gradonacelnik:    [this.Gradovi[i].gradonacelnik],
        nadmorska_visina: [this.Gradovi[i].nadmorska_visina],
        povrsina:         [this.Gradovi[i].povrsina],
        stanovnistvo:     [this.Gradovi[i].stanovnistvo],
        postanski_broj:   [this.Gradovi[i].postanski_broj],
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

  

}


