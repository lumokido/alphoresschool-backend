package com.lumo.backend.assignments.dto;

import com.lumo.backend.students.dto.StudentResponse;
import java.time.LocalDate;
import java.util.List;

public record ClassHomeworkSubmissionResponse(
    Long assignmentId,
    LocalDate submissionDate,
    List<StudentResponse> targetStatusStudents,
    List<StudentResponse> defaultStatusStudents
) {}
