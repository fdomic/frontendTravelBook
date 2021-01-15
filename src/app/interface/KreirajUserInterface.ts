export interface KreirajUserInterface {
    success: boolean;
    data: UsertInterface;
}

export interface UsertInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    updated_at: string;
    created_at: string;
}
