package com.lumo.backend.assignments.repository;

import com.lumo.backend.assignments.entity.Assignment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findBySchoolClassIdAndSectionId(Long classId, Long sectionId);
    List<Assignment> findBySchoolClassId(Long classId);
    List<Assignment> findByAssignedDate(java.time.LocalDate assignedDate);
    List<Assignment> findByAssignedDateAndSchoolClassId(java.time.LocalDate assignedDate, Long classId);
    List<Assignment> findByAssignedDateAndSchoolClassIdAndSectionId(java.time.LocalDate assignedDate, Long classId, Long sectionId);
}
