/* eslint-disable prettier/prettier */
export interface Department {
    id: number;
    idCompany: number;
    idLeader: number;
    name: string;
    desc: string;
    responsibilities: string[];
    createdAt: Date;
    updatedAt: Date;
}

