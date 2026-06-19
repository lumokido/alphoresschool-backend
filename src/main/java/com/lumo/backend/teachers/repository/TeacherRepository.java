package com.lumo.backend.teachers.repository;

import com.lumo.backend.teachers.entity.Teacher;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByEmailId(String emailId);
    Optional<Teacher> findByClassTeacher(String classTeacher);
}
