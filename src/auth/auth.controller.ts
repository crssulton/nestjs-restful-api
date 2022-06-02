import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/users/dto/create.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RefreshAccessTokenDTO } from './dto/refresh-access-token.dto';
import { GetUser } from './get-user.decorator';
import { LoginResponse } from './interface/login-res.interface';
import { RefreshAccessTokenResponse } from './interface/refresh-access-token-res.interface';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() payload: LoginDTO): Promise<LoginResponse> {
    return await this.authService.login(payload);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() payload: RefreshAccessTokenDTO,
  ): Promise<RefreshAccessTokenResponse> {
    return await this.authService.refreshAccessToken(payload);
  }

  @Patch('revoke/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async revokeRefreshToken(@Param('id') id: string, @GetUser() user: User) {
    return await this.authService.revokeRefreshToken(id, user);
  }

  @Post('register')
  async createData(@Body() payload: CreateUserDTO): Promise<User> {
    return await this.usersService.createData(payload);
  }
}
