package com.lumo.backend.health.service;

import com.lumo.backend.health.dto.HealthRecordRequest;
import com.lumo.backend.health.entity.HealthRecord;
import com.lumo.backend.health.repository.HealthRecordRepository;
import org.springframework.stereotype.Service;

@Service
public class HealthRecordService {

    private final HealthRecordRepository healthRecordRepository;

    public HealthRecordService(HealthRecordRepository healthRecordRepository) {
        this.healthRecordRepository = healthRecordRepository;
    }

    public HealthRecord saveHealthRecord(HealthRecordRequest request) {
        HealthRecord record = healthRecordRepository.findByStudentId(request.studentId())
                .orElse(new HealthRecord());
        
        record.setStudentId(request.studentId());
        record.setHeight(request.height());
        record.setWeight(request.weight());
        record.setRemarks(request.remarks());
        record.setBloodGroup(request.bloodGroup());

        return healthRecordRepository.save(record);
    }

    public HealthRecord getHealthRecord(String studentId) {
        return healthRecordRepository.findByStudentId(studentId).orElse(null);
    }
}
