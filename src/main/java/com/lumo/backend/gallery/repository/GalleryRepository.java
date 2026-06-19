package com.lumo.backend.gallery.repository;

import com.lumo.backend.gallery.entity.Gallery;
import com.lumo.backend.gallery.entity.GalleryType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    List<Gallery> findAllByOrderByCreatedAtDesc();
    List<Gallery> findByTypeOrderByCreatedAtDesc(GalleryType type);
}
