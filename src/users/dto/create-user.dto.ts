import { ApiProperty } from '@nestjs/swagger';
import { MinLength, Matches, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

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
  password: string;
}
