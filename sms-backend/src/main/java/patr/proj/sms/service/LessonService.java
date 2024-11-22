package patr.proj.sms.service;

import patr.proj.sms.dto.LessonDto;

import java.util.List;

public interface LessonService {
    LessonDto createLesson(LessonDto lessonDto);

    LessonDto getLessonById(Long lessonId);

    List<LessonDto> getAllLessons();

    List<LessonDto> getLessonsByStudentId(Long studentId);

    LessonDto updateLesson(Long lessonId, LessonDto updatedLesson);

    void deleteLesson(Long lessonId);

}
