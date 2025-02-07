import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/user-role.constant';
import { ROLES_KEY } from '../constants/roles-key.constant';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
