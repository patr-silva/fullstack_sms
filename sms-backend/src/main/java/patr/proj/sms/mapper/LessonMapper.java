package patr.proj.sms.mapper;


import patr.proj.sms.dto.LessonDto;
import patr.proj.sms.entity.Lesson;
import patr.proj.sms.entity.Student;

public class LessonMapper {

    public static LessonDto mapToLessonDto(Lesson lesson) {
        return new LessonDto(
                lesson.getId(),
                lesson.getTitle(),
                lesson.getDescription(),
                lesson.getStartTime(),
                lesson.getEndTime(),
                lesson.getStudent().getId()
        );
    }

    public static Lesson mapToLesson(LessonDto lessonDto) {

        Lesson lesson = new Lesson();
        lesson.setId(lessonDto.getId());
        lesson.setTitle(lessonDto.getTitle());
        lesson.setDescription(lessonDto.getDescription());
        lesson.setStartTime(lessonDto.getStartTime());
        lesson.setEndTime(lessonDto.getEndTime());


        return lesson;
    }

    public static Lesson mapToLesson(LessonDto lessonDto, Student student) {

        System.out.println("Mapping LessonDto to Lesson:");
        System.out.println("LessonDto: " + lessonDto);
        System.out.println("Student: " + student);
        Lesson lesson = new Lesson();
        lesson.setId(lessonDto.getId());
        lesson.setTitle(lessonDto.getTitle());
        lesson.setDescription(lessonDto.getDescription());
        lesson.setStartTime(lessonDto.getStartTime());
        lesson.setEndTime(lessonDto.getEndTime());
        lesson.setStudent(student);
        return lesson;
    }

}
