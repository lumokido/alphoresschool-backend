package com.lumo.backend.timetable.controller;

import com.lumo.backend.timetable.dto.TimetableRequest;
import com.lumo.backend.timetable.entity.Timetable;
import com.lumo.backend.timetable.service.TimetableService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @PostMapping
    public ResponseEntity<Timetable> saveTimetableEntry(@RequestBody TimetableRequest request) {
        return ResponseEntity.ok(timetableService.saveTimetableEntry(request));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Timetable>> saveTimetableEntries(@RequestBody List<TimetableRequest> requests) {
        return ResponseEntity.ok(timetableService.saveTimetableEntries(requests));
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Timetable>> getTimetableByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(timetableService.getTimetableByClassAndSection(classId, null));
    }

    @GetMapping("/class/{classId}/section/{sectionId}")
    public ResponseEntity<List<Timetable>> getTimetableByClassAndSection(
            @PathVariable Long classId,
            @PathVariable Long sectionId) {
        return ResponseEntity.ok(timetableService.getTimetableByClassAndSection(classId, sectionId));
    }

    @GetMapping("/my-timetable")
    public ResponseEntity<List<Timetable>> getMyTimetable(
            @org.springframework.web.bind.annotation.RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        return ResponseEntity.ok(timetableService.getMyTimetable(authorizationHeader));
    }
}
