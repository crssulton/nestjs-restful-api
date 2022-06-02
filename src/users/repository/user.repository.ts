import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create.dto';
import { FilterUserDTO } from '../dto/filter.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { identity } from 'rxjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getData(filter: FilterUserDTO): Promise<User[]> {
    const { name, email } = filter;

    const query = this.createQueryBuilder('book');

    if (name) {
      query.andWhere(`lower(book.name) LIKE :name`, {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (email) {
      query.andWhere(`lower(book.email) LIKE :email`, {
        email: `%${email.toLowerCase()}%`,
      });
    }

    return await query.getMany();
  }

  async createData(data: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(data.password, salt);
    const query = this.create({
      ...data,
      salt,
      password,
    });

    try {
      return await query.save();
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`Email ${data.email} already used!`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }
}
