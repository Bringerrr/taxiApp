import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  username: string;
}
