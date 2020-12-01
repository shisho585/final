import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAll<string[]>('role', [context.getHandler(), context.getClass()]);
    if (!roles) {
      return true;
    }
    const token = context.switchToHttp().getRequest().headers.authorization;
    let role;
    try {
      role = this.jwtService.verify(token).role;
    } catch (error) {
      throw new ForbiddenException();
    }
    return role == 'admin' || !roles.includes('admin');
  }
}
