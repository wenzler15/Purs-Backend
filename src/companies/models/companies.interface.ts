/* eslint-disable prettier/prettier */
export interface Company {
    id: number;
    name: string;
    corporateName: string;
    cnpj: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    street?: string;
    district?: string;
    houseNumber?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    status: number;
    token: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}