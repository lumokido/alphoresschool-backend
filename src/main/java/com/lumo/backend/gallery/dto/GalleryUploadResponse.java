package com.lumo.backend.gallery.dto;

public record GalleryUploadResponse(
    boolean success,
    String message,
    String imageUrl
) {}
