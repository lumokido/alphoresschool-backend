package com.lumo.backend.gallery.service;

import com.lumo.backend.gallery.dto.GalleryRequest;
import com.lumo.backend.gallery.dto.GalleryImageRequest;
import com.lumo.backend.gallery.entity.Gallery;
import com.lumo.backend.gallery.entity.GalleryImage;
import com.lumo.backend.gallery.repository.GalleryRepository;
import com.lumo.backend.gallery.repository.GalleryImageRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final GalleryImageRepository galleryImageRepository;

    public GalleryService(GalleryRepository galleryRepository, GalleryImageRepository galleryImageRepository) {
        this.galleryRepository = galleryRepository;
        this.galleryImageRepository = galleryImageRepository;
    }

    public Gallery createGallery(GalleryRequest request) {
        Gallery gallery = new Gallery();
        gallery.setTitle(request.title());
        gallery.setDescription(request.description());
        return galleryRepository.save(gallery);
    }

    public GalleryImage addImageToGallery(Long galleryId, GalleryImageRequest request) {
        Gallery gallery = galleryRepository.findById(galleryId)
                .orElseThrow(() -> new IllegalArgumentException("Gallery not found: " + galleryId));

        GalleryImage image = new GalleryImage();
        image.setGallery(gallery);
        image.setImageUrl(request.imageUrl());
        return galleryImageRepository.save(image);
    }

    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    public List<GalleryImage> getImagesByGallery(Long galleryId) {
        return galleryImageRepository.findByGalleryId(galleryId);
    }
}
