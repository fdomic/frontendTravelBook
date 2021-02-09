export interface KreirajKlubInterface {
    success: boolean;
    data: KluboviInterface;
}

export interface KluboviInterface {
    id: number;
    
    id_grada: number;
    ime_gradevine: string;
    arhitekt: number;
    godina_izgradnje: string;
    opis_kraci: number;
    opis_duzi: number;
    adresa: number;
    sluzbena_stranica: number;
    slika: number;

    updated_at: string;
    created_at: string;
}
