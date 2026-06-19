package com.lumo.backend.gallery.service;

import com.lumo.backend.exception.StorageFileNotFoundException;
import com.lumo.backend.gallery.dto.GalleryResponse;
import com.lumo.backend.gallery.dto.GalleryUploadResponse;
import com.lumo.backend.gallery.entity.Gallery;
import com.lumo.backend.gallery.repository.GalleryRepository;
import com.lumo.backend.service.FileStorageService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final FileStorageService fileStorageService;

    public GalleryService(GalleryRepository galleryRepository, FileStorageService fileStorageService) {
        this.galleryRepository = galleryRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public GalleryUploadResponse uploadImage(String title, String description, MultipartFile file, String uploadedBy) {
        // Save the file physically
        String imageUrl = fileStorageService.saveGalleryImage(file);

        // Save DB record
        Gallery gallery = new Gallery();
        gallery.setTitle(title);
        gallery.setDescription(description);
        gallery.setImageUrl(imageUrl);
        gallery.setUploadedBy(uploadedBy);
        gallery.setCreatedAt(LocalDateTime.now());

        galleryRepository.save(gallery);

        return new GalleryUploadResponse(true, "Image uploaded successfully", imageUrl);
    }

    @Transactional(readOnly = true)
    public List<GalleryResponse> getAllGalleryItems() {
        return galleryRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(g -> new GalleryResponse(
                        g.getId(),
                        g.getTitle(),
                        g.getDescription(),
                        g.getImageUrl(),
                        g.getUploadedBy(),
                        g.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteGalleryItem(Long id) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new StorageFileNotFoundException("Gallery item not found with ID: " + id));

        // Delete physical file
        fileStorageService.deleteFile(gallery.getImageUrl());

        // Delete database record
        galleryRepository.delete(gallery);
    }
}
