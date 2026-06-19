package com.lumo.backend.marks.controller;

import com.lumo.backend.marks.dto.MarkRequest;
import com.lumo.backend.marks.dto.ReportCardResponse;
import com.lumo.backend.marks.entity.Mark;
import com.lumo.backend.marks.service.MarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/marks")
public class MarkController {

    private final MarkService markService;

    public MarkController(MarkService markService) {
        this.markService = markService;
    }

    @PostMapping
    public ResponseEntity<Mark> saveMark(@RequestBody MarkRequest request) {
        return ResponseEntity.ok(markService.saveMark(request));
    }

    @PostMapping("/bulk")
    public ResponseEntity<java.util.List<Mark>> saveBulkMarks(@RequestBody com.lumo.backend.marks.dto.BulkMarkRequest request) {
        return ResponseEntity.ok(markService.saveBulkMarks(request));
    }

    @GetMapping("/report-card/student/{studentId}/exam/{examId}")
    public ResponseEntity<ReportCardResponse> getReportCard(
            @PathVariable String studentId,
            @PathVariable Long examId) {
        return ResponseEntity.ok(markService.calculateReportCard(studentId, examId));
    }
}
