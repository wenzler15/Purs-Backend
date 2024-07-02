/* eslint-disable prettier/prettier */
export interface Company {
    id: number;
    name: string;
    corporateName: string;
    cnpj: string;
    logoLink: string;
    createdAt: Date;
    updatedAt: Date;
    mission: string;
    vision: string;
    values: string;
    email: string;
    street?: string;
    district?: string;
    houseNumber?: string;
    neighborhood?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    status: number;
    token: string;
    password: string;
    arrayResponsible: any;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}