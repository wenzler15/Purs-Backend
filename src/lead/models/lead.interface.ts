/* eslint-disable prettier/prettier */
export interface Lead {
    id: number;
    companyName: string;
    companyPhone: string;
    companySegment: string;
    occupation: string; 
    fullName: string;
    email: string;
    password: string; 
    status: number;
    token?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
}