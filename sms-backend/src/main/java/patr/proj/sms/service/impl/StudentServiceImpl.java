package patr.proj.sms.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import patr.proj.sms.dto.StudentDto;
import patr.proj.sms.entity.Student;
import patr.proj.sms.exception.ResourceNotFoundException;
import patr.proj.sms.mapper.StudentMapper;
import patr.proj.sms.repository.StudentRepository;
import patr.proj.sms.service.StudentService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;

    @Override
    public StudentDto createStudent(StudentDto studentDto) {

        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);

        return StudentMapper.mapToStudentDto((savedStudent));
    }

    @Override
    public StudentDto getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(() ->
                new ResourceNotFoundException("We could not find a student with the given id"));
        return StudentMapper.mapToStudentDto((student));
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(StudentMapper::mapToStudentDto).collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updatedStudent) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("We could not find a student with the given id"));

        student.setFirstName(updatedStudent.getFirstName());
        student.setLastName(updatedStudent.getLastName());
        student.setAge(updatedStudent.getAge());
        student.setGrade(updatedStudent.getGrade());
        student.setGuardianName(updatedStudent.getGuardianName());
        student.setGuardianContact(updatedStudent.getGuardianContact());

        Student updatedStudentObj = studentRepository.save(student);

        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("We could not find a student with the given id"));
        studentRepository.deleteById(studentId);
    }
}
