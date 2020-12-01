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
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const token = headers.authorization;
    let decryptedToken;
    try {
      decryptedToken = this.jwtService.verify(token);
    } catch (error) {
      throw new ForbiddenException();
    }

    return decryptedToken.role == 'admin' ||
      (!roles.includes('admin') &&
        decryptedToken.email == request.url.split(request.route.path.split(':email')[0])[1]);
  }
}
