export interface PdiAction {
    id: number;
    idFather: number;
    title: string;
    desc: string;
    delivery: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}