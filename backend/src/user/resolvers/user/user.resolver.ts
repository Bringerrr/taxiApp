import { LoginUserDto } from '@app/user/dto/createUser.dto';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { CreateUserInput } from '@app/user/inputs/createUser.input';
import { LoginUserInput } from '@app/user/inputs/loginUser.input';
import { UpdateUserInput } from '@app/user/inputs/updateUser.input';
import { TUserResponse } from '@app/user/types/user.type';
import {
  IUserResponse,
  UserLoginResponse,
} from '@app/user/types/userResponse.interface';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { UseGuards } from '@nestjs/common';
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
  @UseGuards(AuthGuard)
  async getUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  @Query(() => UserLoginResponse)
  async loginUser(
    @Args('loginUser') userLoginInput: LoginUserDto,
  ): Promise<IUserResponse> {
    return await this.userService.loginUser(userLoginInput);
  }
}
