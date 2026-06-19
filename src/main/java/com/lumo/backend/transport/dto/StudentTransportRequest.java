package com.lumo.backend.transport.dto;

public record StudentTransportRequest(
    String studentId,
    Long routeId
) {
}
