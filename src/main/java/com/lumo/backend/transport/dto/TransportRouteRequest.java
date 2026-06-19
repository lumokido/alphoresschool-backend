package com.lumo.backend.transport.dto;

import java.time.LocalTime;

public record TransportRouteRequest(
    String routeName,
    String busNumber,
    LocalTime pickupTime,
    LocalTime dropTime
) {
}
