import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { environment } from "../environments/environment";
import { LoginResponseInterface } from './interface/LoginResponseInterface';
import { KreirajUserInterface } from "./interface/KreirajUserInterface";
import { KreirajDrzavuInterface } from "./interface/KreirajDrzavuInterface";
import { KreirajPoznatuZnamenitostInterface } from "./interface/KreirajPoznatuZnamenitostInterface";
import { KreirajGradInterface } from "./interface/KreirajGradInterface";
import { KreirajMuzejInterface } from "./interface/KreirajMuzejInterface";
import { KreirajKazalistaInterface } from "./interface/KreirajKazalistaInterface";
import { KreirajDvoracInterface } from "./interface/KreirajDvoracInterface";
import { KreirajKlubInterface } from "./interface/KreirajKlubInterface";
import { KreirajPoznatuZnamenitostCijenaInterface } from "./interface/KreirajPoznatuZnamenitostCijenaInterface";
import { KreirajMuzejiCijenaInterface } from "./interface/KreirajMuzejiCijenaInterface";




@Injectable()
export class ApiService {
  private url: string = environment.apiServer;

  constructor(private http: HttpClient) {}

  //-------AUTETIFIKACIJA---------------------------------------------------------------------

    // Prijava
    public login(
      email: string,
      password: string
    ): Observable<LoginResponseInterface> {
      let payload = {
        email: email,
        password: password
      };

      
      return <any> this.http.post(this.url + "/login", payload, this.getHttpOptions()).pipe(tap( () => {

        console.log(payload)

      } ));
    }

    // novi korisnik
    public kreirajUsera(
      name: string,
      email: string,
      password: string,
      id?: number
    ): Observable<KreirajUserInterface> {
      let payload = {
        name: name,
        email: email,
        password: password
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/register", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }
  
  //------------------DRZAVA-----------------------------------------------------------------------
  
    // Dohvati sve podatke za drzavu
    public dohvatiDrzavu(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/drzave/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/drzave", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu drzavu
    public kreirajDrzavu(
      
      naziv_drzave:      string,
      glavni_grad:       string,
      sluzbeni_jezik:    string,
      predsjednik:       string,
      predsjednik_vlade: string,
      neovisnost:        string,
      povrsina:          number,
      stanovnistvo:      number,
      valuta:            string,
      pozivni_broj:      number,
      slika:             string,
      sluzbena_stranica: string,
      id?:               number,

    ): Observable<KreirajDrzavuInterface> {
      let payload = {
        naziv_drzave:      naziv_drzave,
        glavni_grad:       glavni_grad,
        sluzbeni_jezik:    sluzbeni_jezik,
        predsjednik:       predsjednik,
        predsjednik_vlade: predsjednik_vlade,
        neovisnost:        neovisnost,
        povrsina:          povrsina,
        stanovnistvo:      stanovnistvo,
        valuta:            valuta,
        pozivni_broj:      pozivni_broj,
        slika:             slika,
        sluzbena_stranica: sluzbena_stranica,
        
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/drzave", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    // Azuriraj podatak za drzavu
    public azurirajDrzavu ( 
      
      naziv_drzave?:      string,
      glavni_grad?:       string,
      sluzbeni_jezik?:    string,
      predsjednik?:       string,
      predsjednik_vlade?: string,
      neovisnost?:        string,
      povrsina?:          number,
      stanovnistvo?:      number,
      valuta?:            string,
      pozivni_broj?:      number,
      slika?:             string,
      sluzbena_stranica?: string,
      id?:               number,

    ): Observable<KreirajDrzavuInterface> {
        let payload = {
          naziv_drzave: naziv_drzave
          
        };
        if (id)                payload["id"] = id;
        if (glavni_grad)       payload["glavni_grad"] = glavni_grad;
        if (sluzbeni_jezik)    payload["sluzbeni_jezik"] = sluzbeni_jezik; 
        if (predsjednik)       payload["predsjednik"] = predsjednik;
        if (predsjednik_vlade) payload["predsjednik_vlade"] = predsjednik_vlade;
        if (neovisnost)        payload["neovisnost"] = neovisnost;
        if (povrsina)          payload["povrsina"] = povrsina;
        if (stanovnistvo)      payload["stanovnistvo"] = stanovnistvo;
        if (valuta)            payload["valuta"] = valuta;
        if (pozivni_broj)      payload["pozivni_broj"] = pozivni_broj;
        if (slika)             payload["slika"] = slika;
        if (sluzbena_stranica) payload["sluzbena_stranica"] = sluzbena_stranica;
        
        return <any> this.http.post(this.url + "/drzave", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi drzavu
    public obrisiDrzavu(id:number): Observable<KreirajDrzavuInterface> {
      return <any> this.http.delete(this.url + "/drzave/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }


  //------------------GRAD-----------------------------------------------------------------------

    // Dohvati gradove
    public dohvatiGrad(id?: number):Observable<any>{ // Dohvati sve podatke za Gradove

      if (id) return <any> this.http.get(this.url + "/gradovi/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/gradovi", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu grad
    public kreirajGrad(
      id_drzave:        number,
      naziv_grada:      string,
      gradonacelnik:    string,	
      povrsina:         number,
      nadmorska_visina: string,	
      stanovnistvo:     number,
      postanski_broj:   number,
      pozivni_broj:     number,
      slika:            string,
      sluzbena_stranica:string,
      id?:              number

    ): Observable<KreirajGradInterface> {
      let payload = {
        id_drzave:        id_drzave,
        naziv_grada:      naziv_grada,
        gradonacelnik:    gradonacelnik,	
        povrsina:         povrsina,
        nadmorska_visina: nadmorska_visina,	
        stanovnistvo:     stanovnistvo,
        postanski_broj:   postanski_broj,
        pozivni_broj:     pozivni_broj,
        slika:            slika,
        sluzbena_stranica:sluzbena_stranica,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/gradovi", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za drzavu
    public azurirajGrad ( 
      
      id_drzave?:        number,
      naziv_grada?:      string,
      gradonacelnik?:    string,	
      povrsina?:         number,
      nadmorska_visina?: string,	
      stanovnistvo?:     number,
      postanski_broj?:   number,
      pozivni_broj?:     number,
      slika?:            string,
      sluzbena_stranica?:string,
      id?:               number

    ): Observable<KreirajGradInterface> {
        let payload = {
          naziv_grada: naziv_grada
          
        };
        if (id)                payload["id"] = id;
        if (id_drzave)         payload["id_drzave"] = id_drzave;
        if (gradonacelnik)     payload["gradonacelnik"] = gradonacelnik; 
        if (povrsina)          payload["povrsina"] = povrsina;
        if (nadmorska_visina)  payload["nadmorska_visina"] = nadmorska_visina;
        if (stanovnistvo)      payload["stanovnistvo"] = stanovnistvo;
        if (postanski_broj)    payload["postanski_broj"] = postanski_broj;
        if (pozivni_broj)      payload["pozivni_broj"] = pozivni_broj;
        if (slika)             payload["slika"] = slika;
        if (sluzbena_stranica) payload["sluzbena_stranica"] = sluzbena_stranica;

        return <any> this.http.post(this.url + "/gradovi", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi drzavu
    public obrisiGrad(id:number): Observable<KreirajGradInterface> {
      return <any> this.http.delete(this.url + "/gradovi/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

  //------------------Poznatz znamenitosti-----------------------------------------------------------------------

    // Dohvati sve podatke za poznate-znamenitosti
    public dohvatiPoznatuZnamenitost(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/poznate-znamenitosti/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/poznate-znamenitosti", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu poznate-znamenitosti
    public kreirajPoznatuZnamenitost(

      id_grada:        number,
      ime_gradevine:    string,
      arhitekt:         string,	
      godina_izgradnje: string,
      opis_kraci:       string,	
      opis_duzi:        string,
      adresa:           string,
      sluzbena_stranica:string,
      slika:            string,
      id?:              number



    ): Observable<KreirajPoznatuZnamenitostInterface> {
      let payload = {
        id_grada:        id_grada,
        ime_gradevine:    ime_gradevine,
        arhitekt:         arhitekt,	
        godina_izgradnje: godina_izgradnje,
        opis_kraci:       opis_kraci,	
        opis_duzi:        opis_duzi,
        adresa:           adresa,
        sluzbena_stranica:sluzbena_stranica,
        slika:            slika,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/poznate-znamenitosti", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za poznate-znamenitosti
    public azurirajPoznatuZnamenitost ( 
      
      id_grada?:         string,
      ime_gradevine?:    string,
      arhitekt?:         string,	
      godina_izgradnje?: string,
      opis_kraci?:       string,	
      opis_duzi?:        string,
      adresa?:           string,
      sluzbena_stranica?:string,
      slika?:            string,
      id?:               number

    ): Observable<KreirajPoznatuZnamenitostInterface> {
        let payload = {
          
        };
        if (id)                payload["id"] = id;
        if (id_grada)         payload["id_grada"] = id_grada;
        if (ime_gradevine)     payload["ime_gradevine"] = ime_gradevine; 
        if (arhitekt)          payload["arhitekt"] =  arhitekt;
        if (godina_izgradnje)  payload["godina_izgradnje"] = godina_izgradnje;
        if (opis_kraci)        payload["opis_kraci"] = opis_kraci;
        if (opis_duzi)         payload["opis_duzi"] = opis_duzi;
        if (adresa)            payload["adresa"] = adresa;
        if (sluzbena_stranica) payload["sluzbena_stranica"] = sluzbena_stranica;
        if (slika)             payload["slika"] = slika;

        return <any> this.http.post(this.url + "/poznate-znamenitosti", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi poznate-znamenitosti
    public obrisiPoznatuZnamenitost(id:number): Observable<KreirajPoznatuZnamenitostInterface> {
      return <any> this.http.delete(this.url + "/poznate-znamenitosti/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

  //------------------Poznatz znamenitosti cijena-----------------------------------------------------------------------

    // Dohvati sve podatke za poznate-znamenitosti cijena
    public dohvatiPoznatuZnamenitostCijena(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/poznate-znamenitosti-cijene/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/poznate-znamenitosti-cijene", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu poznate-znamenitosti cijena
    public kreirajPoznatuZnamenitostCijena(

      id_poznate_znamenitosti: number,
      karta:                   string,
      opis:                    string,
      trajanje_karte:          number,
      cijena:                  number,
      id?:                     number

    ): Observable<KreirajPoznatuZnamenitostCijenaInterface> {
      let payload = {
        id_poznate_znamenitosti: id_poznate_znamenitosti,
        karta:                   karta,
        opis:                    opis,
        trajanje_karte:          trajanje_karte,
        cijena:                  cijena,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/poznate-znamenitosti-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za poznate-znamenitosti cijena
    public azurirajPoznatuZnamenitostCijena ( 
      
      id_poznate_znamenitosti?: number,
      karta?:                   string,
      opis?:                    string,
      trajanje_karte?:          number,
      cijena?:                  number,
      id?:                      number

    ): Observable<KreirajPoznatuZnamenitostCijenaInterface> {
        let payload = {
          
        };
        if (id)                      payload["id"] = id;
        if (id_poznate_znamenitosti) payload["id_poznate_znamenitosti"] = id_poznate_znamenitosti;
        if (karta)                   payload["karta"] = karta; 
        if (opis)                    payload["opis"] =  opis;
        if (trajanje_karte)          payload["trajanje_karte"] = trajanje_karte;
        if (cijena)                  payload["cijena"] = cijena;

        return <any> this.http.post(this.url + "/poznate-znamenitosti-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi poznate-znamenitosti cijena
    public obrisiPoznatuZnamenitostCijena(id:number): Observable<KreirajPoznatuZnamenitostCijenaInterface> {
      return <any> this.http.delete(this.url + "/poznate-znamenitosti-cijene/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

  //------------------Dvorci-----------------------------------------------------------------------

    // Dohvati sve podatke za dvorci
    public dohvatiDvorce(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/dvorci/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/dvorci", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu Dvorac
    public kreirajDvorac(

      id_grada:        number,
      ime_gradevine:    string,
      arhitekt:         string,	
      godina_izgradnje: string,
      opis_kraci:       string,	
      opis_duzi:        string,
      adresa:           string,
      sluzbena_stranica:string,
      slika:            string,
      id?:              number



    ): Observable<KreirajDvoracInterface> {
      let payload = {
        id_grada:        id_grada,
        ime_gradevine:    ime_gradevine,
        arhitekt:         arhitekt,	
        godina_izgradnje: godina_izgradnje,
        opis_kraci:       opis_kraci,	
        opis_duzi:        opis_duzi,
        adresa:           adresa,
        sluzbena_stranica:sluzbena_stranica,
        slika:            slika,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/dvorci", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za poznate-znamenitosti
    public azurirajDvorac ( 
      
      id_grada?:         string,
      ime_gradevine?:    string,
      arhitekt?:         string,	
      godina_izgradnje?: string,
      opis_kraci?:       string,	
      opis_duzi?:        string,
      adresa?:           string,
      sluzbena_stranica?:string,
      slika?:            string,
      id?:               number

    ): Observable<KreirajDvoracInterface> {
        let payload = {
          
        };
        if (id)                payload["id"] = id;
        if (id_grada)          payload["id_grada"] = id_grada;
        if (ime_gradevine)     payload["ime_gradevine"] = ime_gradevine; 
        if (arhitekt)          payload["arhitekt"] =  arhitekt;
        if (godina_izgradnje)  payload["godina_izgradnje"] = godina_izgradnje;
        if (opis_kraci)        payload["opis_kraci"] = opis_kraci;
        if (opis_duzi)         payload["opis_duzi"] = opis_duzi;
        if (adresa)            payload["adresa"] = adresa;
        if (sluzbena_stranica) payload["sluzbena_stranica"] = sluzbena_stranica;
        if (slika)             payload["slika"] = slika;

        return <any> this.http.post(this.url + "/dvorci", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi dvorci
    public obrisiDvorac(id:number): Observable<KreirajDvoracInterface> {
      return <any> this.http.delete(this.url + "/dvorci/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }
  //------------------Dvorci cijena-----------------------------------------------------------------------

    // Dohvati sve podatke za dvorcicijena
    public dohvatiDvorciCijena(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/dvorci-cijene/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/dvorci-cijene", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu dvorac cijena
    public kreirajDvorciCijena(

      id_muzeji:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
      let payload = {
        id_muzeji:     id_muzeji,
        karta:         karta,
        opis:          opis,
        trajanje_karte:trajanje_karte,
        cijena:        cijena,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/dvorci-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za dvorac cijena
    public azurirajDvorciCijena ( 
      
      id_muzeji:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
        let payload = {
          
        };
        if (id)             payload["id"] = id;
        if (id_muzeji)      payload["id_poznate_znamenitosti"] = id_muzeji;
        if (karta)          payload["karta"] = karta; 
        if (opis)           payload["opis"] =  opis;
        if (trajanje_karte) payload["trajanje_karte"] = trajanje_karte;
        if (cijena)         payload["cijena"] = cijena;

        return <any> this.http.post(this.url + "/dvorci-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi dvorac cijena
    public obrisiDvorciCijena(id:number): Observable<KreirajMuzejiCijenaInterface> {
      return <any> this.http.delete(this.url + "/dvorci-cijene/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }


  //------------------Muzeji-----------------------------------------------------------------------

    // Dohvati sve podatke za muzeji
    public dohvatiMuzeje(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/muzeji/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/muzeji", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu muzej
    public kreirajMuzej(

      id_grada:        number,
      ime_gradevine:    string,
      arhitekt:         string,	
      godina_izgradnje: string,
      opis_kraci:       string,	
      opis_duzi:        string,
      adresa:           string,
      sluzbena_stranica:string,
      slika:            string,
      id?:              number



    ): Observable<KreirajMuzejInterface> {
      let payload = {
        id_grada:        id_grada,
        ime_gradevine:    ime_gradevine,
        arhitekt:         arhitekt,	
        godina_izgradnje: godina_izgradnje,
        opis_kraci:       opis_kraci,	
        opis_duzi:        opis_duzi,
        adresa:           adresa,
        sluzbena_stranica:sluzbena_stranica,
        slika:            slika,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/muzeji", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za poznate-znamenitosti
    public azurirajMuzej( 
      
      id_grada?:         string,
      ime_gradevine?:    string,
      arhitekt?:         string,	
      godina_izgradnje?: string,
      opis_kraci?:       string,	
      opis_duzi?:        string,
      adresa?:           string,
      sluzbena_stranica?:string,
      slika?:            string,
      id?:               number

    ): Observable<KreirajMuzejInterface> {
        let payload = {
          
        };
        if (id)                payload["id"] = id;
        if (id_grada)          payload["id_grada"] = id_grada;
        if (ime_gradevine)     payload["ime_gradevine"] = ime_gradevine; 
        if (arhitekt)          payload["arhitekt"] =  arhitekt;
        if (godina_izgradnje)  payload["godina_izgradnje"] = godina_izgradnje;
        if (opis_kraci)        payload["opis_kraci"] = opis_kraci;
        if (opis_duzi)         payload["opis_duzi"] = opis_duzi;
        if (adresa)            payload["adresa"] = adresa;
        if (sluzbena_stranica) payload["sluzbena_stranica"] = sluzbena_stranica;
        if (slika)             payload["slika"] = slika;

        return <any> this.http.post(this.url + "/muzeji", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi muzeji
    public obrisiMuzej(id:number): Observable<KreirajMuzejInterface> {
      return <any> this.http.delete(this.url + "/muzeji/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

  
  //------------------Muzej cijena-----------------------------------------------------------------------

    // Dohvati sve podatke za Muzej cijena
    public dohvatiMuzejiCijena(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/muzeji-cijene/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/muzeji-cijene", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu Muzej cijena
    public kreirajMuzejCijena(

      id_muzeji:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
      let payload = {
        id_muzeji:     id_muzeji,
        karta:         karta,
        opis:          opis,
        trajanje_karte:trajanje_karte,
        cijena:        cijena,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/muzeji-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za Muzej cijena
    public azurirajMuzejCijena ( 
      
      id_muzeji:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
        let payload = {
          
        };
        if (id)             payload["id"] = id;
        if (id_muzeji)      payload["id_poznate_znamenitosti"] = id_muzeji;
        if (karta)          payload["karta"] = karta; 
        if (opis)           payload["opis"] =  opis;
        if (trajanje_karte) payload["trajanje_karte"] = trajanje_karte;
        if (cijena)         payload["cijena"] = cijena;

        return <any> this.http.post(this.url + "/muzeji-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi Muzej cijena
    public obrisiMuzejCijena(id:number): Observable<KreirajMuzejiCijenaInterface> {
      return <any> this.http.delete(this.url + "/muzeji-cijene/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

  //------------------Klubovi-----------------------------------------------------------------------

    // Dohvati sve podatke za klubove
    public dohvatiKlubove(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/klubovi/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/klubovi", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novi klub
    public kreirajKlub(

      id_grada:        number,
      ime_gradevine:    string,
      arhitekt:         string,	
      godina_izgradnje: string,
      opis_kraci:       string,	
      opis_duzi:        string,
      adresa:           string,
      sluzbena_stranica:string,
      slika:            string,
      id?:              number



    ): Observable<KreirajKlubInterface> {
      let payload = {
        id_grada:        id_grada,
        ime_gradevine:    ime_gradevine,
        arhitekt:         arhitekt,	
        godina_izgradnje: godina_izgradnje,
        opis_kraci:       opis_kraci,	
        opis_duzi:        opis_duzi,
        adresa:           adresa,
        sluzbena_stranica:sluzbena_stranica,
        slika:            slika,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/klubovi", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za klub
    public azurirajKlub( 
        
      id_grada?:         string,
      ime_gradevine?:    string,
      arhitekt?:         string,	
      godina_izgradnje?: string,
      opis_kraci?:       string,	
      opis_duzi?:        string,
      adresa?:           string,
      sluzbena_stranica?:string,
      slika?:            string,
      id?:               number

    ): Observable<KreirajKlubInterface> {
        let payload = {
          
        };
        if (id)                payload["id"] = id;
        if (id_grada)          payload["id_grada"] = id_grada;
        if (ime_gradevine)     payload["ime_gradevine"] = ime_gradevine; 
        if (arhitekt)          payload["arhitekt"] =  arhitekt;
        if (godina_izgradnje)  payload["godina_izgradnje"] = godina_izgradnje;
        if (opis_kraci)        payload["opis_kraci"] = opis_kraci;
        if (opis_duzi)         payload["opis_duzi"] = opis_duzi;
        if (adresa)            payload["adresa"] = adresa;
        if (sluzbena_stranica) payload["sluzbena_stranica"] = sluzbena_stranica;
        if (slika)             payload["slika"] = slika;

        return <any> this.http.post(this.url + "/klubovi", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi klubove
    public obrisiKlub(id:number): Observable<KreirajKlubInterface> {
      return <any> this.http.delete(this.url + "/klubovi/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

   //------------------Klubovi cijena-----------------------------------------------------------------------

    // Dohvati sve podatke za klub cijena
    public dohvatiKluboviCijena(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/klubovi-cijene/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/klubovi-cijene", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu klub cijena
    public kreirajKlubCijena(

      id_klubovi:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
      let payload = {
        id_klubovi:     id_klubovi,
        karta:         karta,
        opis:          opis,
        trajanje_karte:trajanje_karte,
        cijena:        cijena,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/klubovi-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za Muzej cijena
    public azurirajKlubCijena ( 
      
      id_klubovi:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
        let payload = {
          
        };
        if (id)             payload["id"] = id;
        if (id_klubovi)     payload["id_poznate_znamenitosti"] = id_klubovi;
        if (karta)          payload["karta"] = karta; 
        if (opis)           payload["opis"] =  opis;
        if (trajanje_karte) payload["trajanje_karte"] = trajanje_karte;
        if (cijena)         payload["cijena"] = cijena;

        return <any> this.http.post(this.url + "/klubovi-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi Muzej cijena
    public obrisiKlubCijena(id:number): Observable<KreirajMuzejiCijenaInterface> {
      return <any> this.http.delete(this.url + "/klubovi-cijene/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

  //------------------Kazalista-----------------------------------------------------------------------

    // Dohvati sve podatke za kazalista
    public dohvatiKazalista(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/kazalista/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/kazalista", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novo kazaliste
    public kreirajKazaliste(

      id_grada:        number,
      ime_gradevine:    string,
      arhitekt:         string,	
      godina_izgradnje: string,
      opis_kraci:       string,	
      opis_duzi:        string,
      adresa:           string,
      sluzbena_stranica:string,
      slika:            string,
      id?:              number



    ): Observable<KreirajKazalistaInterface> {
      let payload = {
        id_grada:        id_grada,
        ime_gradevine:    ime_gradevine,
        arhitekt:         arhitekt,	
        godina_izgradnje: godina_izgradnje,
        opis_kraci:       opis_kraci,	
        opis_duzi:        opis_duzi,
        adresa:           adresa,
        sluzbena_stranica:sluzbena_stranica,
        slika:            slika,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/kazalista", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za kazaliste
    public azurirajKazaliste ( 
      
      id_grada?:         string,
      ime_gradevine?:    string,
      arhitekt?:         string,	
      godina_izgradnje?: string,
      opis_kraci?:       string,	
      opis_duzi?:        string,
      adresa?:           string,
      sluzbena_stranica?:string,
      slika?:            string,
      id?:               number

    ): Observable<KreirajKazalistaInterface> {
        let payload = {
          
        };
        if (id)                payload["id"] = id;
        if (id_grada)          payload["id_grada"] = id_grada;
        if (ime_gradevine)     payload["ime_gradevine"] = ime_gradevine; 
        if (arhitekt)          payload["arhitekt"] =  arhitekt;
        if (godina_izgradnje)  payload["godina_izgradnje"] = godina_izgradnje;
        if (opis_kraci)        payload["opis_kraci"] = opis_kraci;
        if (opis_duzi)         payload["opis_duzi"] = opis_duzi;
        if (adresa)            payload["adresa"] = adresa;
        if (sluzbena_stranica) payload["sluzbena_stranica"] = sluzbena_stranica;
        if (slika)             payload["slika"] = slika;

        return <any> this.http.post(this.url + "/kazalista", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi kazalista
    public obrisiKazaliste(id:number): Observable<KreirajKazalistaInterface> {
      return <any> this.http.delete(this.url + "/kazalista/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

   //------------------Kazalista cijena-----------------------------------------------------------------------

    // Dohvati sve podatke za Muzej cijena
    public dohvatiKazalistaCijena(id?: number):Observable<any>{ 

      if (id) return <any> this.http.get(this.url + "/kazalista-cijene/" + id, this.getHttpOptions()).pipe(tap( () => {} ));

      return <any> this.http.get(this.url + "/kazalista-cijene", this.getHttpOptions()).pipe(tap( () => {} ));
      
    }

    // Kreiraj novu Muzej cijena
    public kreirajKazalisteCijena(

      id_muzeji:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
      let payload = {
        id_muzeji:     id_muzeji,
        karta:         karta,
        opis:          opis,
        trajanje_karte:trajanje_karte,
        cijena:        cijena,
      };
      if (id) payload["id"] = id;
      
      return <any> this.http.post(this.url + "/kazalista-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    
    }

    // Azuriraj podatak za Muzej cijena
    public azurirajKazalisteCijena ( 
      
      id_muzeji:      number,
      karta:          string,
      opis:           string,
      trajanje_karte: number,
      cijena:         number,
      id?:            number

    ): Observable<KreirajMuzejiCijenaInterface> {
        let payload = {
          
        };
        if (id)             payload["id"] = id;
        if (id_muzeji)      payload["id_poznate_znamenitosti"] = id_muzeji;
        if (karta)          payload["karta"] = karta; 
        if (opis)           payload["opis"] =  opis;
        if (trajanje_karte) payload["trajanje_karte"] = trajanje_karte;
        if (cijena)         payload["cijena"] = cijena;

        return <any> this.http.post(this.url + "/kazalista-cijene", payload, this.getHttpOptions()).pipe(tap( () => {} ));
    }

    //Obrisi Muzej cijena
    public obrisiKazalisteCijena(id:number): Observable<KreirajMuzejiCijenaInterface> {
      return <any> this.http.delete(this.url + "/kazalista-cijene/"+id, this.getHttpOptions()).pipe(tap( () => {} ));
    }

  //-----------------------------------------------------------------------------------------
  private getHttpOptions(contentType?: "json" | "form"): any {
    if (!contentType) contentType = "json";
    let headers = {};
    if (contentType === "json") {
      headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headers)
    };

    return httpOptions;
  }

}
