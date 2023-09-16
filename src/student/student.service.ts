import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, MongoRepository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: MongoRepository<Student>,
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

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        
        try {
            const data = await this.studentRepository.find({
              where: {
                id: {
                    $in: studentIds
                }
              },
            });
            console.log('Fetched students:', data); // Log the fetched data
            return data;
          } catch (error) {
            console.error('Error fetching students:', error); // Log any errors
            throw error; // Rethrow the error
          }
    }
}
