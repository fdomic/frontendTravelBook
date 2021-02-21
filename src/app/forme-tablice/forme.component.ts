import { Component, OnInit } from '@angular/core';

import { DodajGradComponent } from '../travelBook/Forme/dodaj-grad/dodaj-grad.component';

import { ApiService } from '../api.services';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-forme',
  templateUrl: './forme.component.html',
  styleUrls: ['./forme.component.scss'],
})
export class FormeComponent implements OnInit {
  public DrzaveUcitavanje: boolean = false;
  public DrzaveLista: Array<any> = [];

  public GradoviUcitavanje: boolean = false;
  public GradoviLista: Array<any> = [];

  public PoznateZnamenitostiUcitavanje: boolean = false;
  public PoznateZnamenitostiCijenaUcitavanje: boolean = false;
  public PoznateZnamenitostiLista: Array<any> = [];
  public PoznateZnamenitostiCijenaLista: Array<any> = [];

  public MuzejiUcitavanje: boolean = false;
  public MuzejiCijenaUcitavanje: boolean = false;
  public MuzejiLista: Array<any> = [];
  public MuzejiCijenaLista: Array<any> = [];

  public DvorciUcitavanje: boolean = false;
  public DvorciCijenaUcitavanje: boolean = false;
  public DvorciLista: Array<any> = [];
  public DvorciCijenaLista: Array<any> = [];

  public KluboviUcitavanje: boolean = false;
  public KluboviCijenaUcitavanje: boolean = false;
  public KluboviLista: Array<any> = [];
  public KluboviCijenaLista: Array<any> = [];

  public KazalistaUcitavanje: boolean = false;
  public KazalistaCijenaUcitavanje: boolean = false;
  public KazalistaLista: Array<any> = [];
  public KazalistaCijenaLista: Array<any> = [];

  public id: any;
  public classGrad: DodajGradComponent;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private message: NzMessageService
  ) {
  }

  public ngOnInit(): void {

    this.dohvatiPodatke(1,true);

  }



  private dohvatiPodatke( podatak?: number , ucitajSve?: boolean): void {
    if (podatak == 1 || ucitajSve == true) {
      //Drzava
      this.DrzaveUcitavanje = true;
      this.apiService.dohvatiDrzavu().subscribe(
        (response) => {
          this.DrzaveLista = response.data;
          this.DrzaveUcitavanje = false;
        },
        (error) => { console.log(error);this.DrzaveUcitavanje = false; }
      );
    }
    if (podatak == 2 || ucitajSve === true) {
      //Gradovi
      this.GradoviUcitavanje = true;
      this.apiService.dohvatiGrad().subscribe(
        (response) => {
          this.GradoviLista = response.data;
          this.GradoviUcitavanje = false;
        },
        (error) =>{ console.log(error); this.GradoviUcitavanje = false; }
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
        (error) => { console.log(error); 
          this.PoznateZnamenitostiUcitavanje = false;}
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
        (error) => { console.log(error); 
          this.PoznateZnamenitostiCijenaUcitavanje = false;}
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
        (error) => { console.log(error); 
          this.MuzejiUcitavanje = false;}
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
        (error) => { console.log(error); 
          this.MuzejiCijenaUcitavanje = false;}
      );
    }
    
    if (podatak == 5 || ucitajSve === true) {
      //Klubovi
      this.KluboviUcitavanje = true;
      this.apiService.dohvatiKlubove().subscribe(
        (response) => {
          this.KluboviLista = response.data;
          this.KluboviUcitavanje = false;
        },
        (error) => { console.log(error);
        
          this.KluboviUcitavanje = false; }
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
        (error) => { console.log(error); 
        
          this.KluboviCijenaUcitavanje = false;
        }
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
        (error) => { console.log(error); 
        
          this.KazalistaUcitavanje = false;}
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

        (error) => { console.log(error);
        
          this.KazalistaCijenaUcitavanje = false; }
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
        (error) => { console.log(error);
          this.DvorciUcitavanje = false; }
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
        (error) => { console.log(error); 
          this.DvorciCijenaUcitavanje = false;}
      );
    }
  }

// Dohvati nazive

  public getNaziv(id_naziv: any, broj): any {
    if (broj == 1) {
      //Drzava
      for (const i in this.DrzaveLista) {
        if (this.DrzaveLista[i].id == id_naziv) {
          return this.DrzaveLista[i].naziv_drzave;
        }
      }
    }

    if (broj == 2) {
      //Grad
      for (const i in this.GradoviLista) {
        if (this.GradoviLista[i].id == id_naziv) {
          return this.GradoviLista[i].naziv_grada;
        }
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
      for (const i in this.KluboviLista) {
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

  public getNazivDrzave(id_drzave: any): any {
    for (const i in this.DrzaveLista) {
      if (this.DrzaveLista[i].id == id_drzave) {
        return this.DrzaveLista[i].naziv_drzave;
      }
    }
  }

  public getNazivGrada(id_grada: any): any {
    for (const i in this.GradoviLista) {
      if (this.GradoviLista[i].id == id_grada) {
        return this.GradoviLista[i].naziv_grada;
      }
    }
  }

  public submitPodatak(podatak, ruta): any {
    if (ruta == 1) {
      this.router.navigate(['dodaj-drzavu/' + podatak]);
    }
    if (ruta == 2) {
      this.router.navigate(['dodaj-grad/' + podatak]);
    }
    //-
    if (ruta == 3) {
      this.router.navigate(['dodaj-poznatu-znamenitost/' + podatak]);
    }
    if (ruta == 31) {
      this.router.navigate(['dodaj-poznatu-znamenitost-cijena/' + podatak]);
    }
    //-
    if (ruta == 4) {
      this.router.navigate(['dodaj-muzej/' + podatak]);
    }
    if (ruta == 41) {
      this.router.navigate(['dodaj-muzej-cijena/' + podatak]);
    }
    if (ruta == 42) {
      this.router.navigate(['dodaj-poznata-dijela/' + podatak]);
    }
    //-
    if (ruta == 5) {
      this.router.navigate(['dodaj-klubovi/' + podatak]);
    }
    if (ruta == 51) {
      this.router.navigate(['dodaj-klubovi-cijena/' + podatak]);
    }
    //-
    if (ruta == 6) {
      this.router.navigate(['dodaj-kazalista/' + podatak]);
    }
    if (ruta == 61) {
      this.router.navigate(['dodaj-kazalista-cijena/' + podatak]);
    }
    //-
    if (ruta == 7) {
      this.router.navigate(['dodaj-dvorci/' + podatak]);
    }
    if (ruta == 71) {
      this.router.navigate(['dodaj-dvorci-cijena/' + podatak]);
    }
  }

  public brisiPodatak(podatakId, brisi): any {
    if (brisi == 1) {
      //DRZAVA
      return this.apiService.obrisiDrzavu(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(1);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 2) {
      //GRAD
      return this.apiService.obrisiGrad(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(2);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 3) {
      //POZNATA ZNAMENITOST
      return this.apiService.obrisiPoznatuZnamenitost(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(3);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 31) {
      //POZNATA ZNAMENITOST CIJENA
      return this.apiService
        .obrisiPoznatuZnamenitostCijena(podatakId)
        .subscribe(
          (response) => {
            if (response) {
              this.createMessage('success');
              this.dohvatiPodatke(31);
            }
          },
          (error) => console.log(error, this.createMessage('error'))
        );
    }

    if (brisi == 4) {
      //MUZEJ
      return this.apiService.obrisiMuzej(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(4);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 41) {
      //MUZEJ CIJENA
      return this.apiService.obrisiMuzejCijena(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(41);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 5) {
      //KLUBOVI
      return this.apiService.obrisiKlub(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(5);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 51) {
      //KLUBOVI CIJENA
      return this.apiService.obrisiKlubCijena(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(51);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 6) {
      //KAZALISTA
      return this.apiService.obrisiKazaliste(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(6);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 61) {
      //KAZALISTA CIJENA
      return this.apiService.obrisiKazalisteCijena(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(61);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 7) {
      //DVORCI
      return this.apiService.obrisiDvorac(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(7);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

    if (brisi == 71) {
      //DVORCI CIJENA
      return this.apiService.obrisiDvorciCijena(podatakId).subscribe(
        (response) => {
          if (response) {
            this.createMessage('success');
            this.dohvatiPodatke(71);
          }
        },
        (error) => console.log(error, this.createMessage('error'))
      );
    }

  }

  public createMessage(type: string): void {
    if (type === 'success') {
      this.message.create(type, `Uspjesno `);
    } else {
      this.message.create(type, `Netočni podatci.Probajte ponovo.`);
    }
  }

  

  //-----------------

  //Nazad u navigaciju
  public nazad(): void {
    this.router.navigate(['navigation']);
  }

  //Grad i Drzava
  public drzavePreusmjeri(): void {
    this.router.navigate(['dodaj-drzavu']);
  }
  public gradPreusmjeri(): void {
    this.router.navigate(['dodaj-grad']);
  }

  //PoznateZnamenitosti
  public poznataZnamenitostPreusmjeri(): void {
    this.router.navigate(['dodaj-poznatu-znamenitost']);
  }
  public poznataZnamenitostCijenaPreusmjeri(): void {
    this.router.navigate(['dodaj-poznatu-znamenitost-cijena']);
  }

  //Muzeji
  public muzejiPreusmjeri(): void {
    this.router.navigate(['dodaj-muzej']);
  }
  public muzejiCijenaPreusmjeri(): void {
    this.router.navigate(['dodaj-muzej-cijena']);
  }
  public muzejiPoznataDijelaPreusmjeri(): void {
    this.router.navigate(['dodaj-poznata-dijela']);
  }

  //Dvorci
  public dvoracPreusmjeri(): void {
    this.router.navigate(['dodaj-dvorci']);
  }
  public dvoracCijenaPreusmjeri(): void {
    this.router.navigate(['dodaj-dvorci-cijena']);
  }

  //Klubovi
  public kluboviPreusmjeri(): void {
    this.router.navigate(['dodaj-klubovi']);
  }
  public kluboviCijenaPreusmjeri(): void {
    this.router.navigate(['dodaj-klubovi-cijena']);
  }

  //Kazalista
  public kazalistaPreusmjeri(): void {
    this.router.navigate(['dodaj-kazalista']);
  }
  public kazalistaCijenaPreusmjeri(): void {
    this.router.navigate(['dodaj-kazalista-cijena']);
  }
}
