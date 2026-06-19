package com.lumo.backend.health.controller;

import com.lumo.backend.health.dto.HealthRecordRequest;
import com.lumo.backend.health.entity.HealthRecord;
import com.lumo.backend.health.service.HealthRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    public HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping
    public ResponseEntity<HealthRecord> saveHealthRecord(@RequestBody HealthRecordRequest request) {
        return ResponseEntity.ok(healthRecordService.saveHealthRecord(request));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<HealthRecord> getHealthRecord(@PathVariable String studentId) {
        HealthRecord record = healthRecordService.getHealthRecord(studentId);
        if (record == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(record);
    }
}
