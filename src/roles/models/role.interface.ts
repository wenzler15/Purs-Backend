/* eslint-disable prettier/prettier */
export interface Role {
    id: number;
    idCompany: number;
    leader: number;
    roleName: string;
    roleDesc: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}