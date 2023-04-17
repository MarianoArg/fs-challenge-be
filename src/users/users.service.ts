import { UserDto } from './../auth/dto/user-auth.dto';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findLoggedIn(user: UserDto) {
    const { id } = user;
    return this.findOne(id);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        {
          error: 'Not Found',
          code: 199,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return { user };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // const {username}
    // if(Object.keys(updateUserDto).length) {
    //   const
    // }
    return `This action updates a #${id} user ${JSON.stringify(updateUserDto)}`;
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { success: true };
    } catch (err) {
      throw new HttpException(
        {
          error: 'Bad Request',
          code: 201,
          message: 'Cannot delete the given user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
