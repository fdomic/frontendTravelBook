export interface KreirajPoznatuZnamenitostCijenaInterface {
    success: boolean;
    data: PoznatuZnamenitostCijenaInterface;
}

export interface PoznatuZnamenitostCijenaInterface {
    id: number;
  
    id_poznate_znamenitosti: number;
    karta:                   string;
    opis:                    string;
    trajanje_karte:          number;
    cijena:                  number;

    updated_at: string;
    created_at: string;
}
