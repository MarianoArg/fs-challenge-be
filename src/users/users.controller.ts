import { UserDto } from '~/auth/dto/user-auth.dto';
import { TransformPlainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { RequestHandler } from '@nestjs/common/interfaces';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @TransformPlainToInstance(User)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('me')
  findLoggedUser(@Request() req: RequestHandler & { user: UserDto }) {
    return this.usersService.findLoggedIn(req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @TransformPlainToInstance(User)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
