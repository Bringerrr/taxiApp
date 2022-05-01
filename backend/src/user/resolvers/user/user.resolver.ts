import { CreateUserInput } from '@app/user/inputs/createUser.input';
import { LoginUserInput } from '@app/user/inputs/loginUser.input';
import { UpdateUserInput } from '@app/user/inputs/updateUser.input';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('users')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserInput);
  }

  @Query(() => UserEntity)
  async getUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  @Query(() => UserEntity)
  async loginUser(
    @Args('loginUser') userLoginInput: LoginUserInput,
  ): Promise<UserEntity> {
    return await this.userService.loginUser(userLoginInput);
  }
}
