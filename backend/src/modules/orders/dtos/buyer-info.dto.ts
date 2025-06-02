import { Role } from "src/constants/user-role.constant";

export class BuyerInfoDto {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    username: string;
    role: Role;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}