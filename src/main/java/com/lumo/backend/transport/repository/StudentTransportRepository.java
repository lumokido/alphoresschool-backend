package com.lumo.backend.transport.repository;

import com.lumo.backend.transport.entity.StudentTransport;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentTransportRepository extends JpaRepository<StudentTransport, Long> {
    Optional<StudentTransport> findByStudentId(String studentId);
}
