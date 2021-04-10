import { ServerUsersService, UserSchema } from '@swap/server/users';
import { ServerAuthController } from './server-auth.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';
import { LoggerMiddleware } from '@swap/server/common';
import { JwtStrategy } from './passport/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTService } from './jwt.service';
import {
  ConsentRegistrySchema,
  EmailVerificationSchema,
  ForgottenPasswordSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'EmailVerification', schema: EmailVerificationSchema },
      { name: 'ForgottenPassword', schema: ForgottenPasswordSchema },
      { name: 'ConsentRegistry', schema: ConsentRegistrySchema },
    ]),
  ],
  controllers: [ServerAuthController],
  providers: [ServerAuthService, ServerUsersService, JWTService, JwtStrategy],
  exports: [ServerAuthService],
})
export class ServerAuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(ServerAuthController);
  }
}
