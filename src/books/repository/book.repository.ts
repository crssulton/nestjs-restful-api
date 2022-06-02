import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBookDTO } from '../dto/create.dto';
import { FilterBookDTO } from '../dto/filter.dto';
import { Book } from '../entity/book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getData(filter: FilterBookDTO, user: User): Promise<Book[]> {
    const { title, author, category, max_year, min_year } = filter;

    const query = this.createQueryBuilder('book').where(
      'book.userId = :userId',
      { userId: user.id },
    );

    if (title) {
      query.andWhere(`lower(book.title) LIKE :title`, {
        title: `%${title.toLowerCase()}%`,
      });
    }

    if (author) {
      query.andWhere(`lower(book.author) LIKE :author`, {
        author: `%${author.toLowerCase()}%`,
      });
    }

    if (category) {
      query.andWhere(`lower(book.category) LIKE :category`, {
        category: `%${category.toLowerCase()}%`,
      });
    }

    if (max_year) {
      query.andWhere(`book.year <= :max_year`, {
        max_year,
      });
    }

    if (min_year) {
      query.andWhere(`book.year >= :min_year`, {
        min_year,
      });
    }
    return await query.getMany();
  }

  async createData(data: CreateBookDTO, user: User): Promise<Book> {
    const query = this.create({
      ...data,
      user,
    });

    try {
      const res = await query.save()
      delete res.user
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
