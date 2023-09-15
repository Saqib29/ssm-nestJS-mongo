import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
    ){}

    async getAllStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({ where: { id } })
    }

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        createStudentInput.id = uuid();
        const student = this.studentRepository.create(createStudentInput)
        return this.studentRepository.save(student);
    }

}
