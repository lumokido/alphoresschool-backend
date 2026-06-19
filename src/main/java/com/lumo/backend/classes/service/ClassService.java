package com.lumo.backend.classes.service;

import com.lumo.backend.classes.dto.ClassRequest;
import com.lumo.backend.classes.dto.SectionRequest;
import com.lumo.backend.classes.entity.SchoolClass;
import com.lumo.backend.classes.entity.Section;
import com.lumo.backend.classes.repository.SchoolClassRepository;
import com.lumo.backend.classes.repository.SectionRepository;
import com.lumo.backend.classes.dto.ClassResponse;
import com.lumo.backend.classes.dto.SectionResponse;
import com.lumo.backend.teachers.entity.Teacher;
import com.lumo.backend.teachers.repository.TeacherRepository;
import com.lumo.backend.students.repository.StudentRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ClassService {

    private final SchoolClassRepository classRepository;
    private final SectionRepository sectionRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    public ClassService(SchoolClassRepository classRepository, SectionRepository sectionRepository, TeacherRepository teacherRepository, StudentRepository studentRepository) {
        this.classRepository = classRepository;
        this.sectionRepository = sectionRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    public SchoolClass createClass(ClassRequest request) {
        if (classRepository.findByName(request.name()).isPresent()) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Class name must be unique");
        }
        SchoolClass sc = new SchoolClass();
        sc.setName(request.name());
        return classRepository.save(sc);
    }

    public List<ClassResponse> getAllClasses() {
        List<Teacher> allTeachers = teacherRepository.findAll();
        return classRepository.findAll().stream().map(sc -> {
            String className = sc.getName();
            
            // Find class teacher (handle section-wise assignment like "10A" or "10Section A")
            String assignedTeacher = allTeachers.stream()
                .filter(t -> t.getClassTeacher() != null && (
                    t.getClassTeacher().equals(className) ||
                    t.getClassTeacher().startsWith(className + "Section ") ||
                    t.getClassTeacher().startsWith(className + " ") ||
                    (t.getClassTeacher().startsWith(className) && t.getClassTeacher().length() == className.length() + 1)
                ))
                .map(Teacher::getName)
                .distinct()
                .collect(Collectors.joining(", "));
                
            if (assignedTeacher.isEmpty()) {
                assignedTeacher = "Not Assigned";
            }

            // Find all teachers teaching this class
            List<Teacher> teachersForClass = allTeachers.stream()
                .filter(t -> t.getClasses().stream().anyMatch(c -> 
                    c.equals(className) || c.startsWith(className + "Section ") || c.startsWith(className + " ") || (c.startsWith(className) && c.length() == className.length() + 1)
                ))
                .toList();
            
            int totalTeachers = teachersForClass.size();
            
            // Find subjects
            String subjects = teachersForClass.stream()
                .flatMap(t -> t.getSubjects().stream())
                .distinct()
                .collect(Collectors.joining(", "));
                
            int totalStudents = studentRepository.countBySchoolClassId(sc.getId());
            int totalSections = sectionRepository.findBySchoolClassId(sc.getId()).size();
            
            return new ClassResponse(sc.getId(), className, assignedTeacher, totalStudents, totalTeachers, totalSections, subjects);
        }).toList();
    }

    public Section createSection(SectionRequest request) {
        SchoolClass sc = classRepository.findById(request.classId())
                .orElseThrow(() -> new IllegalArgumentException("Class not found: " + request.classId()));
        Section section = new Section();
        section.setName(request.name());
        section.setSchoolClass(sc);
        return sectionRepository.save(section);
    }

    public List<SectionResponse> getSectionsByClass(Long classId) {
        List<Teacher> allTeachers = teacherRepository.findAll();
        return sectionRepository.findBySchoolClassId(classId).stream().map(sec -> mapToSectionResponse(sec, allTeachers)).toList();
    }

    public List<SectionResponse> getAllSections() {
        List<Teacher> allTeachers = teacherRepository.findAll();
        return sectionRepository.findAll().stream().map(sec -> mapToSectionResponse(sec, allTeachers)).toList();
    }
    
    private SectionResponse mapToSectionResponse(Section sec, List<Teacher> allTeachers) {
        String fullClassName = sec.getSchoolClass().getName() + "Section " + sec.getName();
        String altClassName = sec.getSchoolClass().getName() + " " + sec.getName();
        String altClassName2 = sec.getSchoolClass().getName() + sec.getName(); // e.g. "10A"
        
        // Find class teacher
        String assignedTeacher = allTeachers.stream()
            .filter(t -> t.getClassTeacher() != null && (
                t.getClassTeacher().equals(fullClassName) || 
                t.getClassTeacher().equals(altClassName) ||
                t.getClassTeacher().equals(altClassName2)
            ))
            .map(Teacher::getName)
            .findFirst()
            .orElse("Not Assigned");

        // Find all teachers
        List<Teacher> teachersForSection = allTeachers.stream()
            .filter(t -> t.getClasses().contains(fullClassName) || t.getClasses().contains(altClassName) || t.getClasses().contains(altClassName2))
            .toList();
        
        int totalTeachers = teachersForSection.size();
        
        String subjects = teachersForSection.stream()
            .flatMap(t -> t.getSubjects().stream())
            .distinct()
            .collect(Collectors.joining(", "));
            
        int totalStudents = studentRepository.countBySchoolClassIdAndSectionId(sec.getSchoolClass().getId(), sec.getId());
        
        return new SectionResponse(
            sec.getId(), 
            sec.getName(), 
            sec.getSchoolClass().getId(), 
            sec.getSchoolClass().getName(), 
            assignedTeacher, 
            totalStudents, 
            totalTeachers, 
            subjects
        );
    }
}
