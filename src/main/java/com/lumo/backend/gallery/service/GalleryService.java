package com.lumo.backend.gallery.service;

import com.lumo.backend.exception.StorageFileNotFoundException;
import com.lumo.backend.gallery.dto.GalleryResponse;
import com.lumo.backend.gallery.dto.GalleryUploadResponse;
import com.lumo.backend.gallery.dto.PaginatedResponse;
import com.lumo.backend.gallery.entity.Gallery;
import com.lumo.backend.gallery.entity.GalleryType;
import com.lumo.backend.gallery.repository.GalleryRepository;
import com.lumo.backend.service.FileStorageService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    @CacheEvict(value = "gallery", allEntries = true)
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
    @Cacheable(value = "gallery", key = "'all-' + (#typeFilter != null ? #typeFilter : 'none') + '-' + #page + '-' + #size")
    public PaginatedResponse<GalleryResponse> getAllGalleryItems(String typeFilter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Gallery> galleryPage;

        if (typeFilter != null && !typeFilter.isBlank()) {
            GalleryType filterEnum = GalleryType.fromString(typeFilter);
            galleryPage = galleryRepository.findByTypeOrderByCreatedAtDesc(filterEnum, pageable);
        } else {
            galleryPage = galleryRepository.findAllByOrderByCreatedAtDesc(pageable);
        }

        List<GalleryResponse> content = galleryPage.getContent().stream()
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

        return new PaginatedResponse<>(
                content,
                galleryPage.getNumber(),
                galleryPage.getSize(),
                galleryPage.getTotalElements(),
                galleryPage.getTotalPages(),
                galleryPage.isLast()
        );
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "gallery", key = "#id")
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
    @CacheEvict(value = "gallery", allEntries = true)
    public GalleryUploadResponse updateGalleryItem(Long id, String title, String description, String type, MultipartFile[] files) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new StorageFileNotFoundException("Gallery item not found with ID: " + id));

        if (title != null && !title.isBlank()) {
            gallery.setTitle(title);
        }
        if (description != null) {
            gallery.setDescription(description);
        }
        if (type != null && !type.isBlank()) {
            gallery.setType(com.lumo.backend.gallery.entity.GalleryType.fromString(type));
        }

        if (files != null && files.length > 0 && !files[0].isEmpty()) {
            // Delete old files
            if (gallery.getImageUrl() != null && !gallery.getImageUrl().isEmpty()) {
                String[] urls = gallery.getImageUrl().split(",");
                for (String url : urls) {
                    fileStorageService.deleteFile(url.trim());
                }
            }

            // Upload new files
            java.util.List<String> imageUrls = new java.util.ArrayList<>();
            for (MultipartFile file : files) {
                String url = fileStorageService.saveGalleryImage(file);
                imageUrls.add(url);
            }
            gallery.setImageUrl(String.join(",", imageUrls));
        }

        galleryRepository.save(gallery);

        java.util.List<String> urls = gallery.getImageUrl() != null && !gallery.getImageUrl().isEmpty()
                ? java.util.Arrays.asList(gallery.getImageUrl().split(","))
                : List.of();
        String firstUrl = urls.isEmpty() ? "" : urls.get(0);

        return new GalleryUploadResponse(true, "Gallery item updated successfully", firstUrl, urls);
    }

    @Transactional
    @CacheEvict(value = "gallery", allEntries = true)
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
