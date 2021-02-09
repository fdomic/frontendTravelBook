import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';
import { MuzejInterface } from 'src/app/interface/KreirajMuzejInterface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public id;
  public validateForm: FormGroup;

  public gradForm: FormGroup;
  public Gradovi: Array<any> = [];
  public MuzejiLista: Array<MuzejInterface> = [];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {
    this.initForm();
    this.dohvatiPodatke();
    this.dohvatiMuzej();
  }

  ngOnInit(): void {}

  private initForm(): void {
    this.validateForm = this.fb.group({
      id_grada: ['', [Validators.required]],
      ime_gradevine: ['', [Validators.required]],
      arhitekt: ['', [Validators.required]],
      godina_izgradnje: ['', [Validators.required]],
      opis_kraci: ['', [Validators.required]],
      opis_duzi: ['', [Validators.required]],
      adresa: ['', [Validators.required]],
      sluzbena_stranica: ['', [Validators.required]],
      slika: ['', [Validators.required]],
    });
  }

  public MuzejiZaPrikaz(): Array<MuzejInterface> {
    return this.MuzejiLista.slice(0, 5);
  }



  private dohvatiPodatke(): void {
    this.apiService.dohvatiGrad().subscribe(
      (response) => (this.Gradovi = response.data),

      (error) => console.log(error)
    );
  }

  public dohvatiMuzej(): void {
    this.apiService.dohvatiMuzeje().subscribe(
      (response) => {
        if (response) {
          // (), console.log(this.MuzejiLista);
          this.MuzejiLista = response.data;
          console.log(this.MuzejiLista);
        }
      },
      (error) => console.log(error)
    );
  }
}
