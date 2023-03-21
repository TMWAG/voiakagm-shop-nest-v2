import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { ROLE_KEYS } from 'src/decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLE_KEYS,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ')[1];
    const user: Partial<User> = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });
    return requiredRoles.some((role) => role == user.role);
  }
}
