import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studentService: StudentService,
    ){}

    @Query(returns => [StudentType])
    Students() {
        return this.studentService.getAllStudents()
    }

    @Query(returns => StudentType)
    Student(@Args('id') id: string) {
        return this.studentService.getStudent(id)
    }

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
        return this.studentService.createStudent(createStudentInput);
    }
}
