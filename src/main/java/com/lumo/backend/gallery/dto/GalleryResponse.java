package com.lumo.backend.gallery.dto;

import java.time.LocalDateTime;

public record GalleryResponse(
    Long id,
    String title,
    String description,
    String imageUrl,
    String uploadedBy,
    LocalDateTime createdAt
) {}
