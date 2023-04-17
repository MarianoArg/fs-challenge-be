import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodosDto } from './dto/get-todo.dto';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestHandler } from '@nestjs/common/interfaces';
import { UserDto } from '~/auth/dto/user-auth.dto';

@ApiBearerAuth()
@ApiTags('todos')
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Request() req: RequestHandler & { user: UserDto },
    @Body() createPostDto: CreateTodoDto,
  ) {
    return this.todosService.create(createPostDto, req.user);
  }

  @Get()
  findAll(
    @Request() req: RequestHandler & { user: UserDto },
    @Query() queryParams: GetTodosDto,
  ) {
    return this.todosService.findAll(queryParams, req.user);
  }

  @Get(':id')
  findOne(
    @Request() req: RequestHandler & { user: UserDto },
    @Param('id') id: string,
  ) {
    return this.todosService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Request() req: RequestHandler & { user: UserDto },
    @Param('id') id: string,
    @Body() updatePostDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updatePostDto, req.user);
  }

  @Delete(':id')
  remove(
    @Request() req: RequestHandler & { user: UserDto },
    @Param('id') id: string,
  ) {
    return this.todosService.remove(id, req.user);
  }
}
