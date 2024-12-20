// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/roles.enum';

export const ROLES_KEY = 'roles';

/**
 * Roles decorator to set metadata for roles.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


