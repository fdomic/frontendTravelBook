import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/api.services';
import { DvoracCijenaInterface } from 'src/app/interface/KreirajDvoracCijenaInterface';
import { DvoracInterface } from 'src/app/interface/KreirajDvoracInterface';
import { GradInterface } from 'src/app/interface/KreirajGradInterface';
import { KazalisteCijenaInterface } from 'src/app/interface/KreirajKazalistaCijenaInterface';
import { KazalistaInterface } from 'src/app/interface/KreirajKazalistaInterface';
import { KlubCijenaInterface } from 'src/app/interface/KreirajKlubCijenaInterface';
import { KluboviInterface } from 'src/app/interface/KreirajKlubInterface';
import { MuzejiCijenaInterface } from 'src/app/interface/KreirajMuzejiCijenaInterface';
import { MuzejInterface } from 'src/app/interface/KreirajMuzejInterface';
import { PoznatuZnamenitostCijenaInterface } from 'src/app/interface/KreirajPoznatuZnamenitostCijenaInterface';
import { PoznatuZnamenitostInterface } from 'src/app/interface/KreirajPoznatuZnamenitostInterface';

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

  public forma: boolean = false;

  public Grad_id: number;
  public validateForm: FormGroup;
  public gradForm: FormGroup;

  //Grad
  public GradoviUcitavanje: boolean = false;
  public GradoviLista: Array<GradInterface> = [];

  //Poznata znamenitost bool
  public PoznateZnamenitostiUcitavanje: boolean = false;
  public PoznateZnamenitostiCijenaUcitavanje: boolean = false;

  public PoznateZnamenitostiLista: Array<PoznatuZnamenitostInterface> = [];
  public PoznateZnamenitostiGradLista: Array<PoznatuZnamenitostInterface> = [];

  public PoznateZnamenitostiCijenaLista: Array<PoznatuZnamenitostCijenaInterface> = [];
  public PoznateZnamenitostiCijenaGradLista: Array<PoznatuZnamenitostCijenaInterface> = [];

  // Muzeji
  public MuzejiUcitavanje: boolean = false;
  public MuzejiCijenaUcitavanje: boolean = false;

  public MuzejiLista: Array<MuzejInterface> = [];
  public MuzejiGradLista: Array<MuzejInterface> = [];

  public MuzejiCijenaLista: Array<MuzejiCijenaInterface> = [];
  public MuzejiCijenaGradLista: Array<MuzejiCijenaInterface> = [];

  //Dvorci
  public DvorciUcitavanje: boolean = false;
  public DvorciCijenaUcitavanje: boolean = false;

  public DvorciLista: Array<DvoracInterface> = [];
  public DvorciGradLista: Array<DvoracInterface> = [];

  public DvorciCijenaLista: Array<DvoracCijenaInterface> = [];
  public DvorciCijenaGradLista: Array<DvoracInterface> = [];

  //Klubovi
  public KluboviUcitavanje: boolean = false;
  public KluboviCijenaUcitavanje: boolean = false;
  public KluboviLista: Array<KluboviInterface> = [];
  public KluboviCijenaLista: Array<KlubCijenaInterface> = [];
  public KluboviCijenaGradLista: Array<KluboviInterface> = [];

  //Kazalista
  public KazalistaUcitavanje: boolean = false;
  public KazalistaCijenaUcitavanje: boolean = false;
  public KazalistaLista: Array<KazalistaInterface> = [];
  public KazalistaGradLista: Array<KazalistaInterface> = [];
  public KazalistaCijenaLista: Array<KazalisteCijenaInterface> = [];
  public KazalistaGradCijenaLista: Array<KazalisteCijenaInterface> = [];

  public UspjesnoNadengrad: boolean = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,

    private message: NzMessageService
  ) {
    this.initForm();

    this.dohvatiPodatke(0, true);
  }

  ngOnInit(): void {}

  public SakriFormu(){

    return this.forma = false;

  }

  private initForm(): void {
    this.validateForm = this.fb.group({
      ime_grada: ['', [Validators.required]],
      id_grada: ['', [Validators.required]],
      ime_gradevine: ['', [Validators.required]],
      arhitekt: ['', [Validators.required]],
      godina_izgradnje: ['', [Validators.required]],
      opis_kraci: ['', [Validators.required]],
      opis_duzi: ['', [Validators.required]],
      adresa: ['', [Validators.required]],
      sluzbena_stranica: ['', [Validators.required]],
      slika: ['', [Validators.required]],
      id_poznate_znamenitosti: ['', [Validators.required]],
      karta: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      trajanje_karte: ['', [Validators.required]],
      cijena: ['', [Validators.required]],
    });
  }

  // Pronadi grad i nadi sve znamenitosti
  public pronadiGrad(): any {
    for (const i in this.GradoviLista) {
      if (
        this.GradoviLista[i].naziv_grada === this.validateForm.value.ime_grada
      ) {
        this.Grad_id = this.GradoviLista[i].id;
        console.log(this.validateForm.value.ime_grada);
        this.UspjesnoNadengrad = true;
        this.dohvatiPodatkeZaZeljeniGrad();
        console.log(this.createMessage('success'));

        return this.UspjesnoNadengrad;
      }
    }

    this.UspjesnoNadengrad = false;
    console.log(this.createMessage('error'));
    return this.UspjesnoNadengrad;
  }

// Prikaz za zeljeni grad

  public MuzejiZaPrikaz(): Array<MuzejInterface> {
    return this.MuzejiGradLista.slice(0, 5);
  }

  public ZnamenitostiZaPrikaz(): Array<PoznatuZnamenitostInterface> {
    return this.PoznateZnamenitostiGradLista.slice(0, 5);
  }

  public KazalistaZaPrikaz(): Array<KazalistaInterface> {
    return this.KazalistaGradLista.slice(0, 5);
  }

  public DvorciZaPrikaz(): Array<DvoracInterface> {
    return this.DvorciGradLista.slice(0, 5);
  }

// Dohvati sve podatke iz tablice

  private dohvatiPodatke(podatak?: number, ucitajSve?: boolean): void {
    if (podatak == 2 || ucitajSve === true) {
      //Gradovi
      this.GradoviUcitavanje = true;
      this.apiService.dohvatiGrad().subscribe(
        (response) => {
          this.GradoviLista = response.data;
          this.GradoviUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    //-
    if (podatak == 3 || ucitajSve === true) {
      //Poznate znamenitosti
      this.PoznateZnamenitostiUcitavanje = true;
      this.apiService.dohvatiPoznatuZnamenitost().subscribe(
        (response) => {
          this.PoznateZnamenitostiLista = response.data;
          this.PoznateZnamenitostiUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    if (podatak == 31 || ucitajSve === true) {
      //Poznate znamenitosti cijena
      this.PoznateZnamenitostiCijenaUcitavanje = true;
      this.apiService.dohvatiPoznatuZnamenitostCijena().subscribe(
        (response) => {
          this.PoznateZnamenitostiCijenaLista = response.data;
          this.PoznateZnamenitostiCijenaUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    //-
    if (podatak == 4 || ucitajSve === true) {
      //Muzeji
      this.MuzejiUcitavanje = true;
      this.apiService.dohvatiMuzeje().subscribe(
        (response) => {
          this.MuzejiLista = response.data;
          this.MuzejiUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    if (podatak == 41 || ucitajSve === true) {
      //Muzeji cijena
      this.MuzejiCijenaUcitavanje = true;
      this.apiService.dohvatiMuzejiCijena().subscribe(
        (response) => {
          this.MuzejiCijenaLista = response.data;
          this.MuzejiCijenaUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    if (podatak == 42 || ucitajSve === true) {
    }
    //-
    if (podatak == 5 || ucitajSve === true) {
      //Klubovi
      this.KluboviUcitavanje = true;
      this.apiService.dohvatiKlubove().subscribe(
        (response) => {
          this.KluboviLista = response.data;
          this.KluboviUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    if (podatak == 51 || ucitajSve === true) {
      //Klubovi cijena
      this.KluboviCijenaUcitavanje = true;
      this.apiService.dohvatiKluboviCijena().subscribe(
        (response) => {
          this.KluboviCijenaLista = response.data;
          this.KluboviCijenaUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    //-
    if (podatak == 6 || ucitajSve === true) {
      //Kazalista
      this.KazalistaUcitavanje = true;
      this.apiService.dohvatiKazalista().subscribe(
        (response) => {
          this.KazalistaLista = response.data;
          this.KazalistaUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    if (podatak == 61 || ucitajSve === true) {
      //Kazalista cijena
      this.KazalistaCijenaUcitavanje = true;
      this.apiService.dohvatiKazalistaCijena().subscribe(
        (response) => {
          this.KazalistaCijenaLista = response.data;
          this.KazalistaCijenaUcitavanje = false;
        },

        (error) => console.log(error)
      );
    }
    //
    if (podatak == 7 || ucitajSve === true) {
      //Dvorci
      this.DvorciUcitavanje = true;
      this.apiService.dohvatiDvorce().subscribe(
        (response) => {
          this.DvorciLista = response.data;
          this.DvorciUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
    if (podatak == 71 || ucitajSve === true) {
      //Dvorci cijena
      this.DvorciCijenaUcitavanje = true;
      this.apiService.dohvatiDvorciCijena().subscribe(
        (response) => {
          this.DvorciCijenaLista = response.data;
          this.DvorciCijenaUcitavanje = false;
        },
        (error) => console.log(error)
      );
    }
  }

//Nadi naziv sve tablice
  public getNaziv(id_naziv: any, broj): any {
    //Grad
    for (const i in this.GradoviLista) {
      if (this.GradoviLista[i].id == id_naziv) {
        return this.GradoviLista[i].naziv_grada;
      }
    }

    if (broj == 3) {
      //Poznata znamenitost
      for (const i in this.PoznateZnamenitostiLista) {
        if (this.PoznateZnamenitostiLista[i].id == id_naziv) {
          return this.PoznateZnamenitostiLista[i].ime_gradevine;
        }
      }
    }

    if (broj == 4) {
      //Muzej
      for (const i in this.MuzejiLista) {
        if (this.MuzejiLista[i].id == id_naziv) {
          return this.MuzejiLista[i].ime_gradevine;
        }
      }
    }

    if (broj == 5) {
      //Klub
      for (const i in this.KazalistaLista) {
        if (this.KluboviLista[i].id == id_naziv) {
          return this.KluboviLista[i].ime_gradevine;
        }
      }
    }

    if (broj == 6) {
      //Kazaliste
      for (const i in this.KazalistaLista) {
        if (this.KazalistaLista[i].id == id_naziv) {
          return this.KazalistaLista[i].ime_gradevine;
        }
      }
    }

    if (broj == 7) {
      //Dvorci
      for (const i in this.DvorciLista) {
        if (this.DvorciLista[i].id == id_naziv) {
          return this.DvorciLista[i].ime_gradevine;
        }
      }
    }
  }

// Dohvati podatke za zeljeni grad

  public dohvatiPodatkeZaZeljeniGrad() {
    //POZNATA ZNAMENITOST
    this.PoznateZnamenitostiGradLista = [];
    for (const i in this.PoznateZnamenitostiLista) {
      if (this.PoznateZnamenitostiLista[i].id_grada === this.Grad_id) {
        this.PoznateZnamenitostiGradLista.push(
          this.PoznateZnamenitostiLista[i]
        );
      }
    }

    //MUZEJ
    this.MuzejiGradLista = [];
    for (const i in this.MuzejiLista) {
      if (this.MuzejiLista[i].id_grada === this.Grad_id) {
        this.MuzejiGradLista.push(this.MuzejiLista[i]);
      }
    }

    //KAZALISTE
    this.KazalistaGradLista = [];
    for (const i in this.KazalistaLista) {
      if (this.KazalistaLista[i].id_grada === this.Grad_id) {
        this.KazalistaGradLista.push(this.KazalistaLista[i]);
      }
    }

    //DVORCI
    this.DvorciGradLista = [];
    for (const i in this.DvorciLista) {
      if (this.DvorciLista[i].id_grada === this.Grad_id) {
        this.DvorciGradLista.push(this.DvorciLista[i]);
      }
    }
  }

// Puni formu

  private popuniFormuIzModela(model: any): void {
    this.validateForm.patchValue({
      id_muzeji: model.id_muzeji,
      id_grada: model.id_grada,
      ime_gradevine: model.ime_gradevine,
      arhitekt: model.arhitekt,
      godina_izgradnje: model.godina_izgradnje,
      opis_kraci: model.opis_kraci,
      opis_duzi: model.opis_duzi,
      adresa: model.adresa,
      sluzbena_stranica: model.sluzbena_stranica,
      slika: model.slika,
    });
  }

  public NadiZnamenitost(id: number): any {
    let model = this.PoznateZnamenitostiLista.find(
      (poznataZnamenitost) => poznataZnamenitost.id === id
    );
    if (model) {
      this.popuniFormuIzModela(model);
      this.forma = true;

      //POZNATA ZNAMENITOST CIJENA
      this.PoznateZnamenitostiCijenaGradLista = [];
      for (const i in this.PoznateZnamenitostiCijenaLista) {
        if (
          this.PoznateZnamenitostiCijenaLista[i].id_poznate_znamenitosti === id
        ) {
          this.PoznateZnamenitostiCijenaGradLista.push(
            this.PoznateZnamenitostiCijenaLista[i]
          );
        }
      }
    } else {
      console.log('[ERROR] Nisam pronašao grad!!!');
    }
  }

  public NadiMuzej(id: number): any {
    let model = this.MuzejiLista.find((muzej) => muzej.id === id);
    if (model) {
      this.popuniFormuIzModela(model);

      //MUZEJ CIJENA
      this.MuzejiCijenaGradLista = [];
      for (const i in this.MuzejiLista) {
        if (this.MuzejiCijenaLista[i].id_muzeji === id) {
          this.MuzejiCijenaGradLista.push(this.MuzejiCijenaLista[i]);
        }
      }
    } else {
      console.log('[ERROR] Nisam pronašao grad!!!');
    }
  }

//Poruka
  public createMessage(type: string): void {
    if (type === 'success') {
      this.message.create(type, `Uspjesno pronaden grad `);
    } else {
      this.message.create(type, `Ovaj grad ne postoji u ovoj aplikaciji.`);
    }
  }

}
