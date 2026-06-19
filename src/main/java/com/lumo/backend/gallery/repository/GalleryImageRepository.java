package com.lumo.backend.gallery.repository;

import com.lumo.backend.gallery.entity.GalleryImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    List<GalleryImage> findByGalleryId(Long galleryId);
}
