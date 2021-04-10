import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  UseInterceptors,
  UseGuards,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ServerUsersService } from './server-users.service';
import {
  IResponse,
  LoggingInterceptor,
  ResponseError,
  ResponseSuccess,
  Roles,
  RolesGuard,
  TransformInterceptor,
} from '@swap/server/common';
import { UserDto } from './dto/user.dto';
import { ProfileDto } from './dto/profile.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { SettingsDto } from './dto/settings.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ServerUsersController {
  constructor(private readonly usersService: ServerUsersService) {}

  @Get('user/:email')
  @UseGuards(RolesGuard)
  @Roles('User')
  async findById(@Param() params): Promise<IResponse> {
    try {
      var user = await this.usersService.findByEmail(params.email);
      return new ResponseSuccess('COMMON.SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('profile/update')
  @UseGuards(RolesGuard)
  @Roles('User')
  async updateProfile(@Body() profileDto: ProfileDto): Promise<IResponse> {
    try {
      var user = await this.usersService.updateProfile(profileDto);
      return new ResponseSuccess('PROFILE.UPDATE_SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Post('gallery/update')
  @UseGuards(RolesGuard)
  @Roles('User')
  async updateGallery(
    @Body() galleryRequest: UpdateGalleryDto
  ): Promise<IResponse> {
    try {
      var user = await this.usersService.updateGallery(galleryRequest);
      return new ResponseSuccess('PROFILE.UPDATE_SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Post('settings/update')
  @UseGuards(RolesGuard)
  @Roles('User')
  async updateSettings(@Body() settingsDto: SettingsDto): Promise<IResponse> {
    try {
      var user = await this.usersService.updateSettings(settingsDto);
      return new ResponseSuccess('SETTINGS.UPDATE_SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('SETTINGS.UPDATE_ERROR', error);
    }
  }
}
