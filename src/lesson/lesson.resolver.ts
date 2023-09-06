import { Resolver, Query } from '@nestjs/graphql';
import { LessonType } from './lesson.types';

@Resolver(of => LessonType)
export class LessonResolver {

    @Query(returns => LessonType)
    Lesson() {
        return {
            id: 'abcd123',
            name: 'saqib',
            startDate: (new Date()).toISOString(),
            endDate: (new Date()).toISOString(),
        }

    }

}