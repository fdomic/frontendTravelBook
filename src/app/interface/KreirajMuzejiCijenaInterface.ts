export interface KreirajMuzejiCijenaInterface {
    success: boolean;
    data: MuzejiCijenaInterface;
}

export interface MuzejiCijenaInterface {
    id: number;
  
    id_muzeji:      number;
    karta:          string;
    opis:           string;
    trajanje_karte: number;
    cijena:         number;

    updated_at: string;
    created_at: string;
}
