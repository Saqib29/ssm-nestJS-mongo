import { Field, InputType } from "@nestjs/graphql";
import { MinLength, IsDateString } from "class-validator";
import { v4 as uuid } from 'uuid';
@InputType()
export class CreateLessonInput {

    id: uuid;

    @MinLength(1)
    @Field()
    name: string;

    @IsDateString()
    @Field()
    startDate: string;

    @IsDateString()
    @Field()
    endDate: string;
}