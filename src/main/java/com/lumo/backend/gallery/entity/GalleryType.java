package com.lumo.backend.gallery.entity;

public enum GalleryType {
    SCHOOL_EVENT,
    EXAMS,
    SPORTS,
    CULTURAL,
    TECHNICAL,
    ACHIEVEMENTS,
    OTHER;

    public static GalleryType fromString(String value) {
        if (value == null || value.isBlank()) {
            return OTHER;
        }
        String sanitized = value.trim().toUpperCase().replace(" ", "_");
        try {
            return GalleryType.valueOf(sanitized);
        } catch (IllegalArgumentException e) {
            // Default fallback
            return OTHER;
        }
    }
}
