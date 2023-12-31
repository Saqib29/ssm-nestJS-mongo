import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.types';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ){}

    @Query(returns => [LessonType])
    Lessons(){
        return this.lessonService.getAllLessons();
    }

    @Query(returns => LessonType)
    Lesson(@Args('id') id: string) {
        return this.lessonService.getLesson(id)
    }

    @Mutation(returns => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput){
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentToLessonInput') assignStudentToLessonInput: AssignStudentsToLessonInput,
    ) {
        const { lessonId, studentIds } = assignStudentToLessonInput
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson){
        return this.studentService.getManyStudents(lesson.students); 
    }
}