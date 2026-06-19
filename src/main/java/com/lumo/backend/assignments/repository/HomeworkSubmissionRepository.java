package com.lumo.backend.assignments.repository;

import com.lumo.backend.assignments.entity.HomeworkSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface HomeworkSubmissionRepository extends JpaRepository<HomeworkSubmission, Long> {

    List<HomeworkSubmission> findByAssignmentId(Long assignmentId);
    
    List<HomeworkSubmission> findByStudentId(String studentId);
    
    Optional<HomeworkSubmission> findByAssignmentIdAndStudentId(Long assignmentId, String studentId);
}
