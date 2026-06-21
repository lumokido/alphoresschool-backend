package com.lumo.backend.timetable.service;

import com.lumo.backend.classes.entity.SchoolClass;
import com.lumo.backend.classes.entity.Section;
import com.lumo.backend.classes.repository.SchoolClassRepository;
import com.lumo.backend.classes.repository.SectionRepository;
import com.lumo.backend.timetable.dto.TimetableRequest;
import com.lumo.backend.timetable.entity.Timetable;
import com.lumo.backend.timetable.repository.TimetableRepository;
import com.lumo.backend.students.repository.StudentRepository;
import com.lumo.backend.security.JwtService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;
    private final SchoolClassRepository classRepository;
    private final SectionRepository sectionRepository;
    private final StudentRepository studentRepository;
    private final JwtService jwtService;

    public TimetableService(
            TimetableRepository timetableRepository,
            SchoolClassRepository classRepository,
            SectionRepository sectionRepository,
            StudentRepository studentRepository,
            JwtService jwtService) {
        this.timetableRepository = timetableRepository;
        this.classRepository = classRepository;
        this.sectionRepository = sectionRepository;
        this.studentRepository = studentRepository;
        this.jwtService = jwtService;
    }

    public Timetable saveTimetableEntry(TimetableRequest request) {
        SchoolClass sc = classRepository.findById(request.classId())
                .orElseThrow(() -> new IllegalArgumentException("Class not found: " + request.classId()));

        Section section = null;
        if (request.sectionId() != null) {
            section = sectionRepository.findById(request.sectionId())
                    .orElseThrow(() -> new IllegalArgumentException("Section not found: " + request.sectionId()));
        }

        Timetable timetable = new Timetable();
        timetable.setSchoolClass(sc);
        timetable.setSection(section);
        timetable.setDay(request.day());
        timetable.setPeriod(request.period());
        timetable.setSubject(request.subject());
        timetable.setTeacherId(request.teacherId());
        timetable.setType(request.type() != null ? request.type() : "PERIOD");
        timetable.setStartTime(request.startTime());
        timetable.setEndTime(request.endTime());

        return timetableRepository.save(timetable);
    }

    public List<Timetable> saveTimetableEntries(List<TimetableRequest> requests) {
        return requests.stream().map(this::saveTimetableEntry).toList();
    }

    public List<Timetable> getTimetableByClassAndSection(Long classId, Long sectionId) {
        if (sectionId != null) {
            return timetableRepository.findBySchoolClassIdAndSectionIdOrSectionIsNull(classId, sectionId);
        }
        return timetableRepository.findBySchoolClassIdAndSectionIsNull(classId);
    }

    public List<Timetable> getMyTimetable(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED, "Missing token");
        }
        String token = authorizationHeader.substring(7).trim();
        String studentId = jwtService.extractStudentSubject(token);
        if (studentId == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED, "Invalid student token");
        }
        com.lumo.backend.students.entity.Student student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED, "Student not found"));
        
        if (student.getSchoolClass() == null) {
            return List.of();
        }

        Long classId = student.getSchoolClass().getId();
        Long sectionId = student.getSection() != null ? student.getSection().getId() : null;

        return getTimetableByClassAndSection(classId, sectionId);
    }
}
