export interface LoginResponseInterface {
    access_token: string;
    expires: number;
    
    id: number;

    user: {
        id: number;
    };

    
}