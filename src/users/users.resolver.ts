import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {
  };

  @Query()
  async jwt(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.usersService.login({ email, password });
  }

  @Query()
  async user(
    @Args('id') id: string
  ) {
    return this.usersService.getUserById(id);
  }

  @Mutation()
  async register(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('password') password: string,
    @Args('email') email: string,
  ) {
    return this.usersService.register({ firstName, lastName, password, email })
  }
}
