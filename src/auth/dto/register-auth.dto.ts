import { Match } from '~/utils/match.decorator';
import {
  MinLength,
  Matches,
  IsEmail,
  IsString,
  IsDefined,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @Expose({ name: 'password' })
  get password(): string {
    return this.password1;
  }

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short - should be 8 chars minimum.',
  })
  @Matches(/[!@#$%&*]/, {
    message:
      'Password should contain at least 1 special character (! @ # $ % & *)',
  })
  @Matches(/[a-z]/, {
    message: 'Password should contain at least 1 lowecase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password should contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password should contain at least 1 number' })
  password1: string;

  @ApiProperty()
  @Match(RegisterAuthDto, (s) => s.password1, {
    message: 'Passwords must match',
  })
  password2: string;
}
