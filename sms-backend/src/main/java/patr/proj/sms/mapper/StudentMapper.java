package patr.proj.sms.mapper;

import patr.proj.sms.dto.StudentDto;
import patr.proj.sms.entity.Student;

public class StudentMapper {

    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getAge(),
                student.getGrade(),
                student.getGuardianName(),
                student.getGuardianContact()
        );
    }

    public static Student mapToStudent(StudentDto studentDto) {
        return new Student(
                studentDto.getId(),
                studentDto.getFirstName(),
                studentDto.getLastName(),
                studentDto.getAge(),
                studentDto.getGrade(),
                studentDto.getGuardianName(),
                studentDto.getGuardianContact()
        );
    }
}
