package patr.proj.sms.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import patr.proj.sms.dto.LessonDto;
import patr.proj.sms.entity.Lesson;
import patr.proj.sms.entity.Student;
import patr.proj.sms.exception.ResourceNotFoundException;
import patr.proj.sms.mapper.LessonMapper;
import patr.proj.sms.repository.LessonRepository;
import patr.proj.sms.repository.StudentRepository;
import patr.proj.sms.service.LessonService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LessonServiceImpl implements LessonService {

    private LessonRepository lessonRepository;
    private StudentRepository studentRepository;

    @Override
    public LessonDto createLesson(LessonDto lessonDto) {
        System.out.println("Lesson payload: " + lessonDto);
        System.out.println("StudentId: " + lessonDto.getStudentId());
        Student student = studentRepository.findById(lessonDto.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Lesson lesson = LessonMapper.mapToLesson(lessonDto, student);
        Lesson savedLesson = lessonRepository.save(lesson);

        return LessonMapper.mapToLessonDto(savedLesson);
    }

    @Override
    public LessonDto getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("We could not find a lesson with the given id"));
        return LessonMapper.mapToLessonDto(lesson);
    }

    @Override
    public List<LessonDto> getAllLessons() {
        List<Lesson> lessons = lessonRepository.findAll();
        return lessons.stream().map(LessonMapper::mapToLessonDto).collect(Collectors.toList());
    }

    @Override
    public List<LessonDto> getLessonsByStudentId(Long studentId) {
        List<Lesson> lessons = lessonRepository.findByStudentId(studentId);
        return lessons.stream().map(LessonMapper::mapToLessonDto).collect(Collectors.toList());
    }

    @Override
    public LessonDto updateLesson(Long lessonId, LessonDto updatedLesson) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("We could not find a lesson with the given id"));
        lesson.setTitle(updatedLesson.getTitle());
        lesson.setDescription(updatedLesson.getDescription());
        lesson.setStartTime(updatedLesson.getStartTime());
        lesson.setEndTime(updatedLesson.getEndTime());

        if (updatedLesson.getStudentId() != null) {
            Student student = studentRepository.findById(updatedLesson.getStudentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
            lesson.setStudent(student);
        }

        return LessonMapper.mapToLessonDto(lessonRepository.save(lesson));
    }

    @Override
    public void deleteLesson(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("We could not find a lesson with the given id"));
        lessonRepository.deleteById(lessonId);
    }
}
