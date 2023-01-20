/* eslint-disable prettier/prettier */
export interface Company {
    id: number;
    name: string;
    cnpj: string;
    createdAt: Date;
    email: string;
    street?: string;
    district?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    status: number;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}