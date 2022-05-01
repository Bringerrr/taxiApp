import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';
import { TUser } from './user.type';

export interface IUserResponse {
  user: TUser;
  token: string;
}

@ObjectType()
export class UserLoginResponse {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  token: string;
}
