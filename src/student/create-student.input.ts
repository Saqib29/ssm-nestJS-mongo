import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { v4 as uuid } from 'uuid';

@InputType()
export class CreateStudentInput {

    id: uuid;

    @MinLength(1)
    @Field()
    firstName: string;

    @MinLength(1)
    @Field()
    lastName: string;
}