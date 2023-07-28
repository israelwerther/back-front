import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { createOneUserArgs } from "../args/create-one-user.args"

@Resolver()
export class UserResolver {
    @Query(() => String)
    users() {
        return 'Hello world'
    }

    @Mutation(() => String)
    createOneUser(@Args() args: createOneUserArgs) {
        console.log("ARGS", args)
        return 'Usuário criado com sucesso'
    }
}
