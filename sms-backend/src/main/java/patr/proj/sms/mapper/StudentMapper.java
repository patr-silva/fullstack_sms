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
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setAge(studentDto.getAge());
        student.setGrade(studentDto.getGrade());
        student.setGuardianName(studentDto.getGuardianName());
        student.setGuardianContact(studentDto.getGuardianContact());
        return student;
    }
}
