export interface KreirajKlubCijenaInterface {
    success: boolean;
    data: KlubCijenaInterface;
}

export interface KlubCijenaInterface {
    id: number;
  
    id_klubovi:              number;
    karta:                   string;
    opis:                    string;
    trajanje_karte:          number;
    cijena:                  number;

    updated_at: string;
    created_at: string;
}
