/* eslint-disable prettier/prettier */
export interface User {
    id: number;
    idCompany: number;
    idRole: number;
    idLeader?: number;
    cpf: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    street?: string;
    district?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    status?: number;
    token?: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}