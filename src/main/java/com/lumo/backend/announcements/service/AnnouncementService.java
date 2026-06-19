package com.lumo.backend.announcements.service;

import com.lumo.backend.announcements.dto.AnnouncementRequest;
import com.lumo.backend.announcements.entity.Announcement;
import com.lumo.backend.announcements.repository.AnnouncementRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public Announcement createAnnouncement(AnnouncementRequest request) {
        Announcement announcement = new Announcement();
        announcement.setTitle(request.title());
        announcement.setDescription(request.description());
        announcement.setType(request.type());
        announcement.setStartDate(request.startDate() != null ? request.startDate() : LocalDate.now());
        return announcementRepository.save(announcement);
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public List<Announcement> getAnnouncementsByType(String type) {
        return announcementRepository.findByType(type);
    }
}
