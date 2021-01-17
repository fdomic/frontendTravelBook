export interface KreirajKlubInterface {
    success: boolean;
    data: KluboviInterface;
}

export interface KluboviInterface {
    id: number;
    
    naziv_drzave:      string;
    glavni_grad:       string;
    sluzbeni_jezik:    string;
    predsjednik:       string;
    predsjednik_vlade: string;
    neovisnost:        string;
    povrsina:          number;
    stanovnistvo:      number;
    valuta:            string;
    pozivni_broj:      number;
    slika:             string;
    sluzbena_stranica: string;

    updated_at: string;
    created_at: string;
}
