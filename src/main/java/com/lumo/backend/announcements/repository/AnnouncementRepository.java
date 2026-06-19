package com.lumo.backend.announcements.repository;

import com.lumo.backend.announcements.entity.Announcement;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByType(String type);
}
