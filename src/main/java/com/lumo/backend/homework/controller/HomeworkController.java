package com.lumo.backend.homework.controller;

import com.lumo.backend.homework.entity.HomeworkFile;
import com.lumo.backend.homework.service.HomeworkService;
import com.lumo.backend.security.JwtService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/homework")
public class HomeworkController {

    private final HomeworkService homeworkService;
    private final JwtService jwtService;

    public HomeworkController(HomeworkService homeworkService, JwtService jwtService) {
        this.homeworkService = homeworkService;
        this.jwtService = jwtService;
    }

    @PostMapping("/{homeworkId}/attachments")
    public ResponseEntity<HomeworkFile> uploadAttachment(
            @PathVariable("homeworkId") Long homeworkId,
            @RequestParam("file") MultipartFile file,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        if (!isTeacherOrAdmin(authorizationHeader)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only Teachers and Admins are authorized to upload homework attachments.");
        }

        HomeworkFile homeworkFile = homeworkService.addAttachment(homeworkId, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(homeworkFile);
    }

    @GetMapping("/{homeworkId}/attachments")
    public ResponseEntity<List<HomeworkFile>> getAttachments(
            @PathVariable("homeworkId") Long homeworkId,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        if (!isAuthenticated(authorizationHeader)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access.");
        }

        List<HomeworkFile> files = homeworkService.getAttachmentsByHomeworkId(homeworkId);
        return ResponseEntity.ok(files);
    }

    @DeleteMapping("/attachments/{fileId}")
    public ResponseEntity<Void> deleteAttachment(
            @PathVariable("fileId") Long fileId,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        if (!isTeacherOrAdmin(authorizationHeader)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only Teachers and Admins are authorized to delete homework attachments.");
        }

        homeworkService.deleteAttachment(fileId);
        return ResponseEntity.noContent().build();
    }

    private boolean isTeacherOrAdmin(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }
        String token = authHeader.substring(7).trim();
        return jwtService.extractAdminSubject(token) != null ||
               jwtService.extractTeacherSubject(token) != null;
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
