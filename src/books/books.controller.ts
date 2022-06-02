import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { User } from 'src/users/entity/user.entity';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create.dto';
import { FilterBookDTO } from './dto/filter.dto';
import { UpdateBookDTO } from './dto/update.dto';
import { Book } from './entity/book.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private booksService: BooksService) {
    this.booksService = booksService;
  }

  @Get()
  async getData(
    @Query() query: FilterBookDTO,
    @GetUser() user: User,
  ): Promise<Book[]> {
    return await this.booksService.getData(query, user);
  }

  @Get('/:id')
  async getDataByID(
    @Param('id', UUIDValidationPipe) id: string,
    @GetUser() user: User,
  ): Promise<Book> {
    return await this.booksService.getDataByID(id, user);
  }

  @Post()
  async createData(
    @Body() payload: CreateBookDTO,
    @GetUser() user: User,
  ): Promise<Book> {
    return await this.booksService.createData(payload, user);
  }

  @Put()
  async updateData(
    @Body() payload: UpdateBookDTO,
    @GetUser() user: User,
  ): Promise<Book> {
    return await this.booksService.updateData(payload, user);
  }

  @Delete('/:id')
  async deleteData(
    @Param('id', UUIDValidationPipe) id: string,
    @GetUser() user: User,
  ) {
    return await this.booksService.deleteData(id, user);
  }
}
