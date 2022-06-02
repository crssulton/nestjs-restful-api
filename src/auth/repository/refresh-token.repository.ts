import { User } from 'src/users/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const refreshToken = this.create();
    refreshToken.user = user;
    refreshToken.isRevoked = false;

    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + (ttl * 1000));

    refreshToken.expiredAt = expiredAt.getTime().toString();

    return await refreshToken.save();
  }
}
