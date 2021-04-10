import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { default as config } from '../config';

const userString =
  config.db.user && config.db.pass
    ? config.db.user + ':' + config.db.pass + '@'
    : '';
const authSource = config.db.authSource
  ? '?authSource=' + config.db.authSource + '&w=1'
  : '';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://' +
        userString +
        config.db.host +
        ':' +
        (config.db.port || '27017') +
        '/' +
        config.db.database +
        authSource
    ),
    ChatModule,
    UsersModule,
    AuthModule,
  ],
  // imports: [AuthModule, UsersModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
