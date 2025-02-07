import { Role } from "../../../constants/user-role.constant";

export interface AuthPayload {
  id: string;
  name: string;
  username: string;
  role: Role;
}