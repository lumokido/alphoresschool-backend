package com.lumo.backend.attendance.repository;

import com.lumo.backend.attendance.entity.Attendance;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(String studentId);
    List<Attendance> findByStudentIdAndAttendanceDateBetween(String studentId, LocalDate start, LocalDate end);
    Optional<Attendance> findByStudentIdAndAttendanceDate(String studentId, LocalDate date);
    List<Attendance> findByAttendanceDate(LocalDate date);
}
