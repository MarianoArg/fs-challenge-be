import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class ActiveUser {
  token: string;

  @Type(() => User)
  user: User;
}
