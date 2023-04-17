import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodosDto } from './dto/get-todo.dto';
import { PrismaService } from '~/prisma/prisma.service';
import { TodoStatus } from '@prisma/client';
import { UserDto } from '~/auth/dto/user-auth.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto, user: UserDto) {
    const { title, body } = createTodoDto;
    return this.prisma.todo.create({
      data: {
        title,
        body,
        status: TodoStatus.INCOMPLETED,
        userId: user.id,
      },
    });
  }

  async findAll(params: GetTodosDto, user: UserDto) {
    const { page, size, status } = params;
    const defaulPageSize = 20;
    const todos = await this.prisma.todo.findMany({
      take: size || defaulPageSize,
      cursor: page
        ? {
            id: page,
          }
        : undefined,
      where: {
        userId: user.id,
        status,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { todos };
  }

  async findOne(id: string, user: UserDto) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo || todo.userId !== user.id) {
      throw new HttpException(
        {
          error: 'Not Found',
          code: 119,
          message: 'Todo not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return { todo };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, user: UserDto) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (todo.userId !== user.id) {
      throw new HttpException(
        {
          error: 'Not Found',
          code: 119,
          message: 'Todo not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto,
    });
  }

  async remove(id: string, user: UserDto) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo || todo.userId !== user.id) {
      throw new HttpException(
        {
          error: 'Not Found',
          code: 119,
          message: 'Todo not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
