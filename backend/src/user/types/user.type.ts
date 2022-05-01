import { UserEntity } from '../user.entity';

export type TUser = Omit<UserEntity, 'hashPassword'>;
export type TUserResponse = TUser & { token: string };
export type TUserLogin = Omit<TUser, 'id' | 'username'>;
