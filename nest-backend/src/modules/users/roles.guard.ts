/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from './users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const { user } = request;
    if (!user) {
      return false;
    }

    const realUser = await this.userService.findOne(user.email);

    // @ts-ignore sfd
    return requiredRoles.some((role) => realUser.roles.includes(role));
  }
}
