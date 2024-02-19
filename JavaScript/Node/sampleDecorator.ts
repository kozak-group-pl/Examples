import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '../../models/user-svc';

export default createParamDecorator(
  (params, ctx: ExecutionContext) => {
      const user: User = ctx.switchToHttp().getRequest().user;
      if (!user) {
          throw new UnauthorizedException();
      }

      return user;
  },
);
