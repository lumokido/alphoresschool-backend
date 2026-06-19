package com.lumo.backend.classes.repository;

import com.lumo.backend.classes.entity.Section;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, Long> {
    List<Section> findBySchoolClassId(Long classId);
    Optional<Section> findByNameAndSchoolClassId(String name, Long classId);
}
