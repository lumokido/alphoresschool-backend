package com.lumo.backend.gallery.dto;

import java.time.LocalDateTime;
import java.util.List;

public record GalleryResponse(
    Long id,
    String title,
    String description,
    String type,
    String imageUrl,
    List<String> imageUrls,
    String uploadedBy,
    LocalDateTime createdAt
) {}
