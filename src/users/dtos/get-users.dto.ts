import { Expose } from 'class-transformer';

export class GetAllUsersDto {
  @Expose()
   name: string;

  @Expose()
  email: string;

  @Expose()
  status: boolean;

  @Expose()
  role: string;
}
