import { Exclude, Expose } from 'class-transformer';

export class User {
  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  password: string;

  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullname: string;

  @Expose()
  todos: [];
}
