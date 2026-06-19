package com.lumo.backend.gallery.controller;

import com.lumo.backend.gallery.dto.GalleryRequest;
import com.lumo.backend.gallery.dto.GalleryImageRequest;
import com.lumo.backend.gallery.entity.Gallery;
import com.lumo.backend.gallery.entity.GalleryImage;
import com.lumo.backend.gallery.service.GalleryService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping
    public ResponseEntity<Gallery> createGallery(@RequestBody GalleryRequest request) {
        return ResponseEntity.ok(galleryService.createGallery(request));
    }

    @PostMapping("/{galleryId}/images")
    public ResponseEntity<GalleryImage> addImageToGallery(
            @PathVariable Long galleryId,
            @RequestBody GalleryImageRequest request) {
        return ResponseEntity.ok(galleryService.addImageToGallery(galleryId, request));
    }

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        return ResponseEntity.ok(galleryService.getAllGalleries());
    }

    @GetMapping("/{galleryId}/images")
    public ResponseEntity<List<GalleryImage>> getImagesByGallery(@PathVariable Long galleryId) {
        return ResponseEntity.ok(galleryService.getImagesByGallery(galleryId));
    }
}
