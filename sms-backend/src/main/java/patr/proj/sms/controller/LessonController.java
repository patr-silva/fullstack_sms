package patr.proj.sms.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import patr.proj.sms.dto.LessonDto;
import patr.proj.sms.service.LessonService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private LessonService lessonService;

    @PostMapping
    public ResponseEntity<LessonDto> createLesson(@RequestBody LessonDto lessonDto) {
        LessonDto savedLesson = lessonService.createLesson(lessonDto);
        return new ResponseEntity<>(savedLesson, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<LessonDto> getLessonById(@PathVariable("id") Long lessonId) {
        LessonDto lessonDto = lessonService.getLessonById(lessonId);
        return ResponseEntity.ok(lessonDto);
    }

    @GetMapping
    public ResponseEntity<List<LessonDto>> getAllLessons() {
        List<LessonDto> lessons = lessonService.getAllLessons();
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("{studentId}")
    public ResponseEntity<List<LessonDto>> getLessonsByStudentId(@PathVariable("studentId") Long studentId) {
        List<LessonDto> lessons = lessonService.getLessonsByStudentId(studentId);
        return ResponseEntity.ok(lessons);
    }

    @PutMapping("{id}")
    public ResponseEntity<LessonDto> updateLesson(@PathVariable("id") Long lessonId, @RequestBody LessonDto updatedLesson) {
        LessonDto lessonDto = lessonService.updateLesson(lessonId, updatedLesson);
        return ResponseEntity.ok(lessonDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLesson(@PathVariable("id") Long lessonId) {
        lessonService.deleteLesson((lessonId));
        return ResponseEntity.ok("Lesson deleted successfully");
    }


}
