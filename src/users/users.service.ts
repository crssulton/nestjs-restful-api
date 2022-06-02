import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create.dto';
import { FilterUserDTO } from './dto/filter.dto';
import { UpdateUserDTO } from './dto/update.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getData(filter: FilterUserDTO, user: User): Promise<User[]> {
    return await this.userRepository.getData(filter);
  }

  async getDataByID(id: string, user?: User): Promise<User> {
    const res = await this.userRepository.findOne(id);

    if (!res) {
      throw new NotFoundException(`Data with id ${id} is not found!`);
    }

    return res;
  }

  async createData(data: CreateUserDTO): Promise<User> {
    return await this.userRepository.createData(data);
  }

  async updateData(data: UpdateUserDTO, user: User): Promise<User> {
    const { id, ...other } = data;
    const res = await this.userRepository.findOne(id);

    if (!res) {
      throw new NotFoundException(`Data with id ${id} is not found!`);
    }

    Object.keys(other).forEach((key) => {
      if (res[key] !== undefined) res[key] = other[key];
    });

    return await res.save();
  }

  async deleteData(id: string, user: User) {
    const res = await this.userRepository.delete(id);

    if (!res.affected) {
      throw new NotFoundException(`Data with id ${id} is not found!`);
    }

    return { message: 'success' };
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<User> {
    return await this.userRepository.validateUser(payload);
  }
}
