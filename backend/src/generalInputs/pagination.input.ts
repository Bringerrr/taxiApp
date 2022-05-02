import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

const DEFAULTS: PageInput = {
  offset: 0,
  limit: 10,
};

@InputType()
export class PageInput {
  @Min(0)
  @Field((type) => Int, { defaultValue: DEFAULTS.offset })
  offset: number;

  @Min(1)
  @Field((type) => Int, { defaultValue: DEFAULTS.limit })
  limit: number;

  static GetDefaults() {
    return DEFAULTS;
  }
}
