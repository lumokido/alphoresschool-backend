package com.lumo.backend.marks.dto;

import java.util.List;

public record BulkMarkRequest(
    String studentId,
    Long examId,
    List<SubjectMarkInput> marks
) {}
