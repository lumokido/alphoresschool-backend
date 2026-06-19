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
    public GalleryUploadResponse uploadImage(String title, String description, String type, MultipartFile[] files, String uploadedBy) {
        if (files == null || files.length == 0) {
            throw new IllegalArgumentException("No files uploaded");
        }

        java.util.List<String> imageUrls = new java.util.ArrayList<>();
        for (MultipartFile file : files) {
            String url = fileStorageService.saveGalleryImage(file);
            imageUrls.add(url);
        }

        String joinedUrls = String.join(",", imageUrls);

        // Save DB record
        Gallery gallery = new Gallery();
        gallery.setTitle(title);
        gallery.setDescription(description);
        gallery.setType(com.lumo.backend.gallery.entity.GalleryType.fromString(type));
        gallery.setImageUrl(joinedUrls);
        gallery.setUploadedBy(uploadedBy);
        gallery.setCreatedAt(LocalDateTime.now());

        galleryRepository.save(gallery);

        String firstUrl = imageUrls.get(0);
        return new GalleryUploadResponse(true, "Image uploaded successfully", firstUrl, imageUrls);
    }

    @Transactional(readOnly = true)
    public List<GalleryResponse> getAllGalleryItems(String typeFilter) {
        List<Gallery> items;
        if (typeFilter != null && !typeFilter.isBlank()) {
            com.lumo.backend.gallery.entity.GalleryType filterEnum = com.lumo.backend.gallery.entity.GalleryType.fromString(typeFilter);
            items = galleryRepository.findByTypeOrderByCreatedAtDesc(filterEnum);
        } else {
            items = galleryRepository.findAllByOrderByCreatedAtDesc();
        }
        return items.stream()
                .map(g -> {
                    java.util.List<String> urls = g.getImageUrl() != null && !g.getImageUrl().isEmpty()
                            ? java.util.Arrays.asList(g.getImageUrl().split(","))
                            : List.of();
                    String firstUrl = urls.isEmpty() ? "" : urls.get(0);
                    return new GalleryResponse(
                            g.getId(),
                            g.getTitle(),
                            g.getDescription(),
                            g.getType() != null ? g.getType().name() : null,
                            firstUrl,
                            urls,
                            g.getUploadedBy(),
                            g.getCreatedAt()
                    );
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public GalleryResponse getGalleryItemById(Long id) {
        Gallery g = galleryRepository.findById(id)
                .orElseThrow(() -> new StorageFileNotFoundException("Gallery item not found with ID: " + id));

        java.util.List<String> urls = g.getImageUrl() != null && !g.getImageUrl().isEmpty()
                ? java.util.Arrays.asList(g.getImageUrl().split(","))
                : List.of();
        String firstUrl = urls.isEmpty() ? "" : urls.get(0);

        return new GalleryResponse(
                g.getId(),
                g.getTitle(),
                g.getDescription(),
                g.getType() != null ? g.getType().name() : null,
                firstUrl,
                urls,
                g.getUploadedBy(),
                g.getCreatedAt()
        );
    }

    @Transactional
    public void deleteGalleryItem(Long id) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new StorageFileNotFoundException("Gallery item not found with ID: " + id));

        if (gallery.getImageUrl() != null && !gallery.getImageUrl().isEmpty()) {
            String[] urls = gallery.getImageUrl().split(",");
            for (String url : urls) {
                fileStorageService.deleteFile(url.trim());
            }
        }

        // Delete database record
        galleryRepository.delete(gallery);
    }
}
