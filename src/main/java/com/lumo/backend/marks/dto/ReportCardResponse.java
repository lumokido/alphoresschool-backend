package com.lumo.backend.marks.dto;

import java.util.List;

public record ReportCardResponse(
    String studentId,
    String examName,
    List<SubjectMarkResponse> subjectMarks,
    Integer totalObtained,
    Integer totalMax,
    Double percentage,
    String grade
) {
}
