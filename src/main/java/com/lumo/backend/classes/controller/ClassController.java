package com.lumo.backend.classes.controller;

import com.lumo.backend.classes.dto.ClassRequest;
import com.lumo.backend.classes.dto.SectionRequest;
import com.lumo.backend.classes.entity.SchoolClass;
import com.lumo.backend.classes.entity.Section;
import com.lumo.backend.classes.service.ClassService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class ClassController {

    private final ClassService classService;

    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @PostMapping("/classes")
    public ResponseEntity<SchoolClass> createClass(@RequestBody ClassRequest request) {
        return ResponseEntity.ok(classService.createClass(request));
    }

    @GetMapping("/classes")
    public ResponseEntity<List<com.lumo.backend.classes.dto.ClassResponse>> getAllClasses() {
        return ResponseEntity.ok(classService.getAllClasses());
    }

    @PostMapping("/sections")
    public ResponseEntity<Section> createSection(@RequestBody SectionRequest request) {
        return ResponseEntity.ok(classService.createSection(request));
    }

    @GetMapping("/sections")
    public ResponseEntity<List<com.lumo.backend.classes.dto.SectionResponse>> getAllSections() {
        return ResponseEntity.ok(classService.getAllSections());
    }

    @GetMapping("/sections/class/{classId}")
    public ResponseEntity<List<com.lumo.backend.classes.dto.SectionResponse>> getSectionsByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(classService.getSectionsByClass(classId));
    }
}
