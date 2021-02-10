export interface KreirajKazalistaCijenaInterface {
    success: boolean;
    data: KazalisteCijenaInterface;
}

export interface KazalisteCijenaInterface {
    id: number;
  
    id_kazalista:              number;
    karta:                   string;
    opis:                    string;
    trajanje_karte:          number;
    cijena:                  number;

    updated_at: string;
    created_at: string;
}
