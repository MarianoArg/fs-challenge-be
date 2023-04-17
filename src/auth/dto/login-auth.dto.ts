import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsDefined } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  password: string;
}
