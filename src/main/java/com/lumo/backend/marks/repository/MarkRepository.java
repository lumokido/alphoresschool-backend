package com.lumo.backend.marks.repository;

import com.lumo.backend.marks.entity.Mark;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarkRepository extends JpaRepository<Mark, Long> {
    List<Mark> findByStudentId(String studentId);
    List<Mark> findByStudentIdAndExamId(String studentId, Long examId);
}
