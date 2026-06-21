package com.lumo.backend.gallery.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "gallery", indexes = {
    @Index(name = "idx_gallery_type", columnList = "type"),
    @Index(name = "idx_gallery_created_at", columnList = "created_at DESC")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private GalleryType type;

    @Column(name = "image_url", length = 2000)
    private String imageUrl;

    @Column(name = "uploaded_by")
    private String uploadedBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
