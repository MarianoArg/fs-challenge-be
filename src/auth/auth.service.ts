import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const saltRounds = 18;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private async checkIfUserAlreadyExists(email: string): Promise<boolean> {
    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });

    return Boolean(findUser);
  }

  async login(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ user: Partial<User>; token: string }> {
    const { email, password } = loginAuthDto;
    const userWithPassword = await this.prisma.user.findUnique({
      where: { email },
      include: {
        password: true,
      },
    });

    if (!userWithPassword || !userWithPassword.password) {
      throw new HttpException(
        {
          error: 'Bad Request',
          code: 209,
          message: 'Cannot log in with those credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValid = await compare(password, userWithPassword.password.hash);

    if (!isValid) {
      throw new HttpException(
        {
          error: 'Bad Request',
          code: 209,
          message: 'Cannot log in with those credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password: _password, ...userWithoutPassword } = userWithPassword;

    const payload = {
      id: userWithoutPassword.id,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      user: userWithoutPassword,
      token,
    };
    return data;
  }

  async createUser(
    registerAuthDto: RegisterAuthDto,
  ): Promise<{ user: Partial<User>; token: string }> {
    const { password, email, fullname } = registerAuthDto;
    const hashedPassword = await hash(password, saltRounds);

    const userAlreadyExists = await this.checkIfUserAlreadyExists(email);

    if (userAlreadyExists) {
      throw new HttpException(
        {
          error: 'Unprocessable Entity',
          code: 206,
          message: 'The email already exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        fullname,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
      },
    });

    const payload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload);
    const data = {
      user: user,
      token,
    };

    return data;
  }
}
