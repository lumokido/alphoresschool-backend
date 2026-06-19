package com.lumo.backend.gallery.controller;

import com.lumo.backend.gallery.dto.GalleryResponse;
import com.lumo.backend.gallery.dto.GalleryUploadResponse;
import com.lumo.backend.gallery.service.GalleryService;
import com.lumo.backend.security.JwtService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;
    private final JwtService jwtService;

    public GalleryController(GalleryService galleryService, JwtService jwtService) {
        this.galleryService = galleryService;
        this.jwtService = jwtService;
    }

    @PostMapping("/upload")
    public ResponseEntity<GalleryUploadResponse> uploadGalleryImage(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("type") String type,
            @RequestParam("file") MultipartFile[] files,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        String adminEmail = getAdminEmail(authorizationHeader);
        if (adminEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only Admins are authorized to upload gallery images.");
        }

        GalleryUploadResponse response = galleryService.uploadImage(title, description, type, files, adminEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GalleryResponse>> getAllGallery(
            @RequestParam(value = "type", required = false) String type,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        if (!isAuthenticated(authorizationHeader)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access.");
        }

        return ResponseEntity.ok(galleryService.getAllGalleryItems(type));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(
            @PathVariable("id") Long id,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        String adminEmail = getAdminEmail(authorizationHeader);
        if (adminEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only Admins are authorized to delete gallery items.");
        }

        galleryService.deleteGalleryItem(id);
        return ResponseEntity.noContent().build();
    }

    private String getAdminEmail(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authHeader.substring(7).trim();
        return jwtService.extractAdminSubject(token);
    }

    private boolean isAuthenticated(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }
        String token = authHeader.substring(7).trim();
        return jwtService.extractAdminSubject(token) != null ||
               jwtService.extractTeacherSubject(token) != null ||
               jwtService.extractStudentSubject(token) != null;
    }
}
