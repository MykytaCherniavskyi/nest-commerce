export interface ILoginDTO {
    username: string;
    password: string;
}

export interface IRegisterDTO {
    username: string;
    password: string;
    seller?: boolean;
}
