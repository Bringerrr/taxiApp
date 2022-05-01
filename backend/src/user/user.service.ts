import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { IUserResponse } from './types/userResponse.interface';
import { compare } from 'bcrypt';
import { TUserLogin, TUserResponse } from './types/user.type';
import { UpdateUserInput } from './inputs/updateUser.input';
import { CreateUserInput } from './inputs/createUser.input';
import { CreateUserDto, LoginUserDto } from './dto/createUser.dto';
import { LoginUserInput } from './inputs/loginUser.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getUsers(): string[] {
    return ['kek', 'lol', '123'];
  }

  async createUser(createUserInput: CreateUserDto): Promise<UserEntity> | null {
    const userByEmail = await this.userRepository.findOne({
      email: createUserInput.email,
    });

    if (userByEmail) {
      throw new HttpException('Email are taken', 422);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserInput);
    return await this.userRepository.save(newUser);
  }

  async loginUser(userLogin: LoginUserDto): Promise<IUserResponse> {
    const userByEmail = await this.userRepository.findOne(
      {
        email: userLogin.email,
      },
      { select: ['email', 'id', 'password', 'username'] },
    );

    if (!userByEmail) {
      throw new HttpException('Email does not exist', HttpStatus.UNAUTHORIZED);
    }

    const validPassword = await compare(
      userLogin.password,
      userByEmail.password,
    );

    if (!validPassword) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    delete userByEmail.password;

    return await this.buildUserResponse(userByEmail);
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const user = await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );

    return await this.findById(updateUserInput.id);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    return {
      user,
      token: this.generateJwt(user),
    };
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }
}
