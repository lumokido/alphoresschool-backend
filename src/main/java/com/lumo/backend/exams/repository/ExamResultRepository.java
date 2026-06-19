package com.lumo.backend.exams.repository;

import com.lumo.backend.exams.entity.ExamResult;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByStudentId(String studentId);
    Optional<ExamResult> findByStudentIdAndExamSubjectId(String studentId, Long examSubjectId);
    List<ExamResult> findByExamSubjectId(Long examSubjectId);
}
