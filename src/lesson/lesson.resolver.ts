import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonType } from './lesson.types';
import { LessonService } from './lesson.service';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
    ){}

    @Query(returns => LessonType)
    Lesson() {
        return {
            id: 'abcd123',
            name: 'saqib',
            startDate: (new Date()).toISOString(),
            endDate: (new Date()).toISOString(),
        }
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string
    ){
        return this.lessonService.createLesson(name, startDate, endDate);
    }

}