import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { CreateBookDTO } from './dto/create.dto';
import { FilterBookDTO } from './dto/filter.dto';
import { UpdateBookDTO } from './dto/update.dto';
import { Book } from './entity/book.entity';
import { BookRepository } from './repository/book.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getData(filter: FilterBookDTO, user: User): Promise<Book[]> {
    return await this.bookRepository.getData(filter, user);
  }

  async getDataByID(id: string, user: User): Promise<Book> {
    const res = await this.bookRepository.findOne(id, { where: { user } });

    if (!res) {
      throw new NotFoundException(`Data with id ${id} is not found!`);
    }

    return res;
  }

  async createData(data: CreateBookDTO, user: User): Promise<Book> {
    return await this.bookRepository.createData(data, user);
  }

  async updateData(data: UpdateBookDTO, user: User): Promise<Book> {
    const { id, ...other } = data;
    const res = await this.bookRepository.findOne(id, { where: { user } });

    if (!res) {
      throw new NotFoundException(`Data with id ${id} is not found!`);
    }

    Object.keys(other).forEach((key) => {
      if (res[key] !== undefined) res[key] = other[key];
    });

    return await res.save();
  }

  async deleteData(id: string, user: User) {
    const res = await this.bookRepository.delete({ id, user });

    if (!res.affected) {
      throw new NotFoundException(`Data with id ${id} is not found!`);
    }

    return { message: 'success' };
  }
}
