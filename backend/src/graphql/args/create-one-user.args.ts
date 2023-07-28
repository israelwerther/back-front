import { ArgsType, Field } from "@nestjs/graphql";
import { createOneUserInput } from "../input/create-one-user.unput";

@ArgsType()
export class createOneUserArgs {
    @Field()
    data: createOneUserInput
}