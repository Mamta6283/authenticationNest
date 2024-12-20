// src/auth/roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../role/dto/roles.decorator';
  import { Role } from '../role/enum/roles.enum';
  
  /**
   * Guard to check roles of the user for route access.
   */

  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // Retrieve roles required for the route.
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) {
        return true; // No roles required, so allow access.
      }
     
      const  request = context.switchToHttp().getRequest();
      const user=request.user
      console.log("user",user)
      console.log("request",request)

    // const { user } = context.switchToHttp().getRequest();
    // console.log("user",user)

      if (!user) {
        throw new UnauthorizedException('User is not authenticated');
      }
    
      // Assuming 'user.role' is available in the request.
      return requiredRoles.includes(user.role);
    }
  }
  