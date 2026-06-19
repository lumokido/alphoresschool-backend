package com.lumo.backend.attendance.controller;

import com.lumo.backend.attendance.dto.AttendanceRequest;
import com.lumo.backend.attendance.entity.Attendance;
import com.lumo.backend.attendance.service.AttendanceService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public ResponseEntity<Attendance> markAttendance(@RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.markAttendance(request));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendanceHistory(@PathVariable String studentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceHistory(studentId));
    }

    @PostMapping("/class")
    public ResponseEntity<com.lumo.backend.attendance.dto.ClassAttendanceResponse> markClassAttendance(
            @RequestBody com.lumo.backend.attendance.dto.ClassAttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.markClassAttendance(request));
    }

    @GetMapping("/stats")
    public ResponseEntity<com.lumo.backend.attendance.dto.DailyAttendanceStatsResponse> getDailyStats(
            @org.springframework.web.bind.annotation.RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date) {
        return ResponseEntity.ok(attendanceService.getDailyStats(date));
    }

    @GetMapping("/my-homeroom-stats")
    public ResponseEntity<com.lumo.backend.attendance.dto.DailyAttendanceStatsResponse> getTeacherHomeroomDailyStats(
            @org.springframework.web.bind.annotation.RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @org.springframework.web.bind.annotation.RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date) {
        return ResponseEntity.ok(attendanceService.getTeacherHomeroomDailyStats(authorizationHeader, date));
    }

    @GetMapping("/history/date")
    public ResponseEntity<List<com.lumo.backend.attendance.dto.AttendanceHistoryRecord>> getAttendanceHistoryByDate(
            @org.springframework.web.bind.annotation.RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendanceHistoryByDate(date));
    }

    @GetMapping("/me")
    public ResponseEntity<com.lumo.backend.attendance.dto.StudentAttendanceSummaryResponse> getMyAttendance(
            @org.springframework.web.bind.annotation.RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @org.springframework.web.bind.annotation.RequestParam(required = false) Integer month,
            @org.springframework.web.bind.annotation.RequestParam(required = false) Integer year) {
        return ResponseEntity.ok(attendanceService.getMyAttendance(authorizationHeader, month, year));
    }
}
