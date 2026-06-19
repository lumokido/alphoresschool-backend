package com.lumo.backend.health.repository;

import com.lumo.backend.health.entity.HealthRecord;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    Optional<HealthRecord> findByStudentId(String studentId);
}
