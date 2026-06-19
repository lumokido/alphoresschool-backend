package com.lumo.backend.service;

import com.lumo.backend.exception.*;
import com.lumo.backend.students.entity.Student;
import com.lumo.backend.students.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadRoot;
    private final StudentRepository studentRepository;

    private static final List<String> ALLOWED_IMAGE_EXTENSIONS = List.of("jpg", "jpeg", "png", "webp");
    private static final List<String> ALLOWED_HOMEWORK_EXTENSIONS = List.of("pdf", "doc", "docx", "jpg", "jpeg", "png");

    public FileStorageService(
            @Value("${app.upload.root:/opt/uploads}") String uploadRoot,
            StudentRepository studentRepository) {
        this.uploadRoot = uploadRoot;
        this.studentRepository = studentRepository;
    }

    public String saveStudentPhoto(MultipartFile file, Long studentId) {
        validateFile(file, ALLOWED_IMAGE_EXTENSIONS);

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StorageFileNotFoundException("Student not found with ID: " + studentId));

        String studentIdStr = student.getStudentId();
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        if (extension.isEmpty()) {
            extension = "jpg";
        }

        String ext = extension.equalsIgnoreCase("jpeg") ? "jpg" : extension.toLowerCase();
        String filename = String.format("student_%s_%d.%s", studentIdStr, System.currentTimeMillis(), ext);

        saveFile(file, "students", filename);
        return generatePublicUrl("students", filename);
    }

    public String saveGalleryImage(MultipartFile file) {
        validateFile(file, ALLOWED_IMAGE_EXTENSIONS);

        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String ext = extension.equalsIgnoreCase("jpeg") ? "jpg" : extension.toLowerCase();
        String filename = String.format("gallery_%s_%d.%s", UUID.randomUUID().toString().substring(0, 8), System.currentTimeMillis(), ext);

        saveFile(file, "gallery", filename);
        return generatePublicUrl("gallery", filename);
    }

    public String saveHomeworkFile(MultipartFile file) {
        validateFile(file, ALLOWED_HOMEWORK_EXTENSIONS);

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            originalFilename = "unnamed";
        }
        String extension = getFileExtension(originalFilename);
        String cleanName = originalFilename.replaceAll("[^a-zA-Z0-9.-]", "_");
        if (cleanName.contains(".")) {
            cleanName = cleanName.substring(0, cleanName.lastIndexOf('.'));
        }

        String filename = String.format("homework_%d_%s.%s", System.currentTimeMillis(), cleanName, extension.toLowerCase());

        saveFile(file, "homework", filename);
        return generatePublicUrl("homework", filename);
    }

    public boolean deleteFile(String path) {
        if (path == null || path.isBlank()) {
            return false;
        }

        String relativePath = path;
        String prefix = "https://api.lumokido.in/uploads/";
        if (path.startsWith(prefix)) {
            relativePath = path.substring(prefix.length());
        } else if (path.startsWith("/opt/uploads/")) {
            relativePath = path.substring("/opt/uploads/".length());
        }

        try {
            Path fileToDelete = Paths.get(uploadRoot, relativePath).normalize();
            if (!fileToDelete.startsWith(Paths.get(uploadRoot).normalize())) {
                throw new SecurityException("Unauthorized file deletion path");
            }
            return Files.deleteIfExists(fileToDelete);
        } catch (IOException e) {
            return false;
        }
    }

    public String generatePublicUrl(String folder, String filename) {
        return String.format("https://api.lumokido.in/uploads/%s/%s", folder, filename);
    }

    private void validateFile(MultipartFile file, List<String> allowedExtensions) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileExtensionException("Uploaded file is empty");
        }

        if (file.getSize() > 20971520L) {
            throw new FileTooLargeException("File size exceeds the limit of 20MB");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new InvalidFileExtensionException("Filename is missing");
        }

        String extension = getFileExtension(originalFilename).toLowerCase();

        List<String> blocked = List.of("exe", "bat", "sh", "cmd", "com", "bin", "jar", "msi", "out", "elf");
        if (blocked.contains(extension)) {
            throw new InvalidFileExtensionException("Executable files are not allowed");
        }

        if (!allowedExtensions.contains(extension)) {
            throw new InvalidFileExtensionException("Invalid file extension. Allowed formats: " + String.join(", ", allowedExtensions).toUpperCase());
        }
    }

    private String getFileExtension(String filename) {
        int dotIdx = filename.lastIndexOf('.');
        if (dotIdx == -1 || dotIdx == filename.length() - 1) {
            return "";
        }
        return filename.substring(dotIdx + 1);
    }

    private void saveFile(MultipartFile file, String folder, String filename) {
        try {
            Path targetDirectory = Paths.get(uploadRoot, folder).normalize();
            if (!targetDirectory.toFile().exists()) {
                targetDirectory.toFile().mkdirs();
            }

            Path targetPath = targetDirectory.resolve(filename).normalize();
            if (!targetPath.startsWith(Paths.get(uploadRoot).normalize())) {
                throw new SecurityException("Unauthorized file path target");
            }

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new FileUploadException("Failed to upload/store file: " + filename, e);
        }
    }
}
