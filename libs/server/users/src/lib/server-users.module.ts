import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '@swap/server/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerUsersService } from './server-users.service';
import { ServerUsersController } from './server-users.controller';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [ServerUsersController],
  providers: [ServerUsersService],
  exports: [ServerUsersService],
})
export class ServerUsersModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(LoggerMiddleware)
     // .exclude(
     //   { path: 'example', method: RequestMethod.GET },
     // )
     .forRoutes(ServerUsersController);
  }
}
