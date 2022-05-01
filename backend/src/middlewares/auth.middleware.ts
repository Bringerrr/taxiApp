import { IExpressRequest } from '@app/types/expressRequest.interface';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { NextFunction } from 'express';
import { JWT_SECRET } from '@app/config';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET);

      const user = await this.userService.findById(decode.id);
      console.log('user decode', user);

      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
