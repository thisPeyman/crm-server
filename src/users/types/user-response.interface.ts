import { UserEntity } from '../user.entity';

export type IUserResponse = Omit<UserEntity, 'hashPassword'> & {
  token: string;
};
