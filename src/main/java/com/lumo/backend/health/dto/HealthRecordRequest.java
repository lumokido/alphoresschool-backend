package com.lumo.backend.health.dto;

public record HealthRecordRequest(
    String studentId,
    Double height,
    Double weight,
    String bloodGroup,
    String remarks
) {
}
