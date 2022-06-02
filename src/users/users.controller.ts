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
import { FilterUserDTO } from './dto/filter.dto';
import { UpdateUserDTO } from './dto/update.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get()
  async getData(
    @Query() query: FilterUserDTO,
    @GetUser() user: User,
  ): Promise<User[]> {
    return await this.usersService.getData(query, user);
  }

  @Get('/:id')
  async getDataByID(
    @Param('id', UUIDValidationPipe) id: string,
    @GetUser() user: User,
  ): Promise<User> {
    return await this.usersService.getDataByID(id, user);
  }

  @Put()
  async updateData(
    @Body() payload: UpdateUserDTO,
    @GetUser() user: User,
  ): Promise<User> {
    return await this.usersService.updateData(payload, user);
  }

  @Delete('/:id')
  async deleteData(
    @Param('id', UUIDValidationPipe) id: string,
    @GetUser() user: User,
  ) {
    return await this.usersService.deleteData(id, user);
  }
}
