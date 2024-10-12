/* eslint-disable prettier/prettier */
export interface Responsibility {
    response: string;
    desc: string;
}

export interface Skill {
    response: string;
    desc: string;
}

export interface Qualification {
    response: string;
    desc: string;
}

export interface Role {
    id: number;
    idCompany?: number;
    idDepartment?: number;
    roleName: string;
    roleDesc: string;
    responsibilities: Responsibility[];
    skills: Skill[];
    qualifications: Qualification[];
    minSalary: number;
    maxSalary: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

