package com.lumo.backend.homework.service;

import com.lumo.backend.exception.StorageFileNotFoundException;
import com.lumo.backend.homework.entity.HomeworkFile;
import com.lumo.backend.homework.repository.HomeworkFileRepository;
import com.lumo.backend.service.FileStorageService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class HomeworkService {

    private final HomeworkFileRepository homeworkFileRepository;
    private final FileStorageService fileStorageService;

    public HomeworkService(HomeworkFileRepository homeworkFileRepository, FileStorageService fileStorageService) {
        this.homeworkFileRepository = homeworkFileRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    @CacheEvict(value = "homeworkAttachments", key = "#homeworkId")
    public HomeworkFile addAttachment(Long homeworkId, MultipartFile file) {
        // Save file physically
        String fileUrl = fileStorageService.saveHomeworkFile(file);

        // Save DB record
        HomeworkFile homeworkFile = new HomeworkFile();
        homeworkFile.setHomeworkId(homeworkId);
        homeworkFile.setFileName(file.getOriginalFilename());
        homeworkFile.setFileUrl(fileUrl);
        homeworkFile.setUploadedAt(LocalDateTime.now());

        return homeworkFileRepository.save(homeworkFile);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "homeworkAttachments", key = "#homeworkId")
    public List<HomeworkFile> getAttachmentsByHomeworkId(Long homeworkId) {
        return homeworkFileRepository.findByHomeworkId(homeworkId);
    }

    @Transactional
    @CacheEvict(value = "homeworkAttachments", key = "#result", condition = "#result != null")
    public Long deleteAttachment(Long fileId) {
        HomeworkFile homeworkFile = homeworkFileRepository.findById(fileId)
                .orElseThrow(() -> new StorageFileNotFoundException("Homework file not found with ID: " + fileId));

        // Delete physical file
        fileStorageService.deleteFile(homeworkFile.getFileUrl());

        Long homeworkId = homeworkFile.getHomeworkId();

        // Delete database record
        homeworkFileRepository.delete(homeworkFile);

        return homeworkId;
    }
}
