package com.lumo.backend.students.repository;

import com.lumo.backend.students.entity.Student;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByMobileNumber(String mobileNumber);
    List<Student> findByStudentClass(String studentClass);
    Optional<Student> findByStudentId(String studentId);
    Optional<Student> findByStudentIdAndMobileNumber(String studentId, String mobileNumber);
    List<Student> findBySchoolClassId(Long classId);
    List<Student> findBySchoolClassIdAndSectionId(Long classId, Long sectionId);
    int countBySchoolClassId(Long classId);
    int countBySchoolClassIdAndSectionId(Long classId, Long sectionId);
}