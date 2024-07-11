/* eslint-disable prettier/prettier */
export interface Role {
    id: number;
    idCompany?: number;
    idDepartment?: number;
    roleName: string;
    roleDesc: string;
    responsibilities: string[];
    skills: string[];
    qualifications: string[];
    minSalary: number;
    maxSalary: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

