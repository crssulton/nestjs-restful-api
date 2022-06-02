import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RefreshAccessTokenDTO } from './dto/refresh-access-token.dto';
import { LoginResponse } from './interface/login-res.interface';
import { RefreshAccessTokenResponse } from './interface/refresh-access-token-res.interface';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(payload: LoginDTO): Promise<LoginResponse> {
    const user = await this.usersService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password!');
    }

    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshAccessToken({
    refresh_token,
  }: RefreshAccessTokenDTO): Promise<RefreshAccessTokenResponse> {
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOne(
      payload.jid,
      { relations: ['user'] },
    );

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not found');
    }

    if (refreshToken.isRevoked) {
      throw new UnauthorizedException('Refresh token has beed revoked');
    }

    const access_token = await this.createAccessToken(refreshToken.user);
    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      } else {
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };

    return await this.jwtService.signAsync(payload);
  }

  async createRefreshToken(user: User): Promise<string> {
    const res = await this.refreshTokenRepository.createRefreshToken(
      user,
      +refreshTokenConfig.expiresIn,
    );

    const payload = {
      jid: res.id,
    };

    return await this.jwtService.signAsync(payload, refreshTokenConfig);
  }

  async revokeRefreshToken(id: string, user: User) {
    const refreshToken = await this.refreshTokenRepository.findOne(id, {
      where: { user },
    });
    
    if (!refreshToken) {
      throw new NotFoundException('Refresh token is not found');
    }

    refreshToken.isRevoked = true;
    await refreshToken.save();
    return { message: 'success' };
  }
}
