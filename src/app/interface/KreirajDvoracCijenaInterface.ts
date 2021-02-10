export interface KreirajDvoracCijenaInterface {
    success: boolean;
    data: DvoracCijenaInterface;
}

export interface DvoracCijenaInterface {
    id: number;
  
    id_dvorci:               number;
    karta:                   string;
    opis:                    string;
    trajanje_karte:          number;
    cijena:                  number;

    updated_at: string;
    created_at: string;
}
