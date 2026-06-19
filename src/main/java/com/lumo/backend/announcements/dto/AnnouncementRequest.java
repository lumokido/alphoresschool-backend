package com.lumo.backend.announcements.dto;

import java.time.LocalDate;

public record AnnouncementRequest(
    String title,
    String description,
    String type,
    LocalDate startDate
) {
}
