import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // TODO: env var, if TEST env then pass the jwt validation

    console.log(`    Req going through JwtAuthGuard - Execute from Handler <${context.getHandler().name}> in Class <${context.getClass().name}>`)

    //returning boolean, indicating whether the current request is allowed or not.
    return super.canActivate(context) as boolean; 
  }

  // docs: https://docs.nestjs.com/security/authentication#graphql
  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    
    /**
     *  http req headers should contain ... 
     *    "Authorization" : "Bearer <JWT>"
     *    
     *    See req headers of any query/muation decorated by @UseGuards(JwtAuthGuard) : 
     *    console.log("GraphQLAuth.guard.ts -- req.headers -- ", ctx.getContext().req.headers)
     */ 

    return ctx.getContext().req;
  }
}