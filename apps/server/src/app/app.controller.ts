import {
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Controller,
  ConflictException,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user';

@Controller()
export class AppController {
  // constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private appService: AppService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  findAll() {
    return this.appService.getData();
  }

  @Post()
  async addUser(@Body('username') username: string) {
    try {
      return await this.usersService.addUser(username);
    } catch (e) {
      throw new ConflictException(e, `User ${e} is already in the chat`);
      // res.status(HttpStatus.CONFLICT).json(`User ${e} is already in the chat`);
    }
  }
}
