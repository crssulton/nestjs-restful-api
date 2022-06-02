import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  JwtModuleAsyncOptions,
  JwtModuleOptions,
  JwtSignOptions,
} from '@nestjs/jwt';

export default class JWTConfig {
  static getConfig(configService: ConfigService): JwtModuleOptions {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: 60 * 60, // exp access token (sec)
      },
    };
  }
}

export const jwtConfigAsync: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> =>
  JWTConfig.getConfig(configService),
  inject: [ConfigService],
};

export const refreshTokenConfig: JwtSignOptions = {
  expiresIn: 60 * 60 * 24, // exp refresh token (sec)
};
