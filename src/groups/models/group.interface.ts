/* eslint-disable prettier/prettier */
export interface Group {
    id: number;
    idCompany?: number;
    name: string;
    desc: string;
    users: number[];
    createdAt: Date;
    updatedAt: Date;
}