export interface KreirajGradInterface {
    success: boolean;
    data: GradInterface;
}

export interface GradInterface {
    id: number;

    id_drzave:        number;	
    naziv_grada:      string;
    gradonacelnik:    string;	
    povrsina:         number;
    nadmorska_visina: string;	
    stanovnistvo:     number;
    postanski_broj:   number;
    pozivni_broj:     number;
    slika:            string;
    sluzbena_stranica:string;

    updated_at: string;
    created_at: string;
}
