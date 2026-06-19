package com.lumo.backend.homework.repository;

import com.lumo.backend.homework.entity.HomeworkFile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeworkFileRepository extends JpaRepository<HomeworkFile, Long> {
    List<HomeworkFile> findByHomeworkId(Long homeworkId);
}
