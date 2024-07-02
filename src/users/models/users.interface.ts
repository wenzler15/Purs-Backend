/* eslint-disable prettier/prettier */
export interface User {
    id?: number;
    idCompany: number;
    idRole?: number;
    idLeader?: number;
    cpf: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    email: string;
    street?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    neighborhood?: string;
    phone?: string;
    houseNumber?: number;
    complement?: string;
    status?: number;
    token?: string;
    responsible?: number;
    tempPassword?: number;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}