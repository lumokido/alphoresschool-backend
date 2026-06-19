package com.lumo.backend.assignments.controller;

import com.lumo.backend.assignments.dto.AssignmentRequest;
import com.lumo.backend.assignments.entity.Assignment;
import com.lumo.backend.assignments.service.AssignmentService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping
    public ResponseEntity<Assignment> createAssignment(
            @RequestBody AssignmentRequest request,
            @org.springframework.web.bind.annotation.RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        return ResponseEntity.ok(assignmentService.createAssignment(request, authorizationHeader));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Assignment>> createAssignments(
            @RequestBody List<AssignmentRequest> requests,
            @org.springframework.web.bind.annotation.RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        return ResponseEntity.ok(assignmentService.createAssignments(requests, authorizationHeader));
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Assignment>> getAssignmentsByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByClassAndSection(classId, null));
    }

    @GetMapping("/class/{classId}/section/{sectionId}")
    public ResponseEntity<List<Assignment>> getAssignmentsByClassAndSection(
            @PathVariable Long classId,
            @PathVariable Long sectionId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByClassAndSection(classId, sectionId));
    }

    @GetMapping("/my-assignments")
    public ResponseEntity<List<Assignment>> getMyAssignments(
            @org.springframework.web.bind.annotation.RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @org.springframework.web.bind.annotation.RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date) {
        return ResponseEntity.ok(assignmentService.getMyAssignments(authorizationHeader, date));
    }

    @PostMapping("/{assignmentId}/submissions")
    public ResponseEntity<com.lumo.backend.assignments.dto.HomeworkSubmissionResponse> markSubmission(
            @PathVariable Long assignmentId,
            @RequestBody com.lumo.backend.assignments.dto.HomeworkMarkRequest request) {
        return ResponseEntity.ok(assignmentService.markSubmission(assignmentId, request));
    }

    @PostMapping("/{assignmentId}/class-submissions")
    public ResponseEntity<com.lumo.backend.assignments.dto.ClassHomeworkSubmissionResponse> markClassHomework(
            @PathVariable Long assignmentId,
            @RequestBody com.lumo.backend.assignments.dto.ClassHomeworkMarkRequest request) {
        return ResponseEntity.ok(assignmentService.markClassHomework(assignmentId, request));
    }

    @GetMapping("/{assignmentId}/submissions")
    public ResponseEntity<List<com.lumo.backend.assignments.dto.HomeworkSubmissionResponse>> getSubmissionsByAssignment(
            @PathVariable Long assignmentId) {
        return ResponseEntity.ok(assignmentService.getSubmissionsByAssignment(assignmentId));
    }

    @GetMapping("/student/{studentId}/submissions")
    public ResponseEntity<List<com.lumo.backend.assignments.dto.HomeworkSubmissionResponse>> getSubmissionsByStudent(
            @PathVariable String studentId) {
        return ResponseEntity.ok(assignmentService.getSubmissionsByStudent(studentId));
    }

    @GetMapping("/history/date")
    public ResponseEntity<List<Assignment>> getAssignmentsByAssignedDate(
            @org.springframework.web.bind.annotation.RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date,
            @org.springframework.web.bind.annotation.RequestParam(required = false) Long classId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByAssignedDate(date, classId));
    }
}
