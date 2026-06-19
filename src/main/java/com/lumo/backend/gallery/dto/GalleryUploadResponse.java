package com.lumo.backend.gallery.dto;

import java.util.List;

public record GalleryUploadResponse(
    boolean success,
    String message,
    String imageUrl,
    List<String> imageUrls
) {}
