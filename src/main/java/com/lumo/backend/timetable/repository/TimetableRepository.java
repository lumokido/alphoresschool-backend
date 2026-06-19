package com.lumo.backend.timetable.repository;

import com.lumo.backend.timetable.entity.Timetable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    List<Timetable> findBySchoolClassIdAndSectionId(Long classId, Long sectionId);
    List<Timetable> findBySchoolClassId(Long classId);
}
