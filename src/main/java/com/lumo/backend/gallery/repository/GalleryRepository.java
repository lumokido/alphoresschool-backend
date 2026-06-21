package com.lumo.backend.gallery.repository;

import com.lumo.backend.gallery.entity.Gallery;
import com.lumo.backend.gallery.entity.GalleryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    Page<Gallery> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Gallery> findByTypeOrderByCreatedAtDesc(GalleryType type, Pageable pageable);
}
