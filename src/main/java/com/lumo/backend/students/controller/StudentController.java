package com.lumo.backend.students.controller;

import com.lumo.backend.students.dto.StudentAdd;
import com.lumo.backend.students.dto.StudentAddResponse;
import com.lumo.backend.students.dto.StudentResponse;
import com.lumo.backend.students.dto.StudentUpdate;
import com.lumo.backend.students.dto.RefreshTokenRequest;
import com.lumo.backend.students.dto.RefreshTokenResponse;
import com.lumo.backend.students.dto.StudentLoginRequest;
import com.lumo.backend.students.dto.StudentLoginResponse;
import com.lumo.backend.students.service.StudentService;
import java.util.Map;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    // POST /api/students/add
    @PostMapping("/add")
    public ResponseEntity<StudentAddResponse> addStudent(@RequestBody StudentAdd request ,  @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        System.out.println(authorizationHeader);
        if (authorizationHeader == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new StudentAddResponse("Unauthorized", null));
        }
        return ResponseEntity.ok(studentService.addStudent(request , authorizationHeader));
    }

    // POST /api/students/login
    @PostMapping("/login")
    public ResponseEntity<StudentLoginResponse> loginStudent(@RequestBody StudentLoginRequest request) {
        Map<String, String> tokens = studentService.loginStudent(request);
        if (tokens == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new StudentLoginResponse(false, "Invalid mobile number or date of birth", null, null));
        }
        return ResponseEntity.ok(new StudentLoginResponse(true, "Student login successful", tokens.get("accessToken"), tokens.get("refreshToken")));
    }

    // POST /api/students/refresh-token
    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        String newAccessToken = studentService.refreshAccessToken(request.refreshToken());
        if (newAccessToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new RefreshTokenResponse(false, "Invalid or expired refresh token", null));
        }
        return ResponseEntity.ok(new RefreshTokenResponse(true, "Token refreshed successfully", newAccessToken));
    }

    // GET /api/students/{studentId}
    @GetMapping("/{studentId}")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getStudentWithTeacher(studentId));
    }

    // PUT /api/students/{studentId}
    @PutMapping("/{studentId}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long studentId,
            @RequestBody StudentUpdate request) {
        return ResponseEntity.ok(studentService.updateStudent(studentId, request));
    }

    // GET /api/students/me
    @GetMapping("/me")
    public ResponseEntity<StudentResponse> getStudentMe(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        return ResponseEntity.ok(studentService.getStudentByToken(authorizationHeader));
    }

    // GET /api/students/class/{className}
    @GetMapping("/class/{className}")
    public ResponseEntity<java.util.List<StudentResponse>> getStudentsByClass(@PathVariable String className) {
        return ResponseEntity.ok(studentService.getStudentsByClass(className));
    }

    // GET /api/students/class/id/{classId}
    @GetMapping("/class/id/{classId}")
    public ResponseEntity<java.util.List<StudentResponse>> getStudentsByClassId(@PathVariable Long classId) {
        return ResponseEntity.ok(studentService.getStudentsByClassId(classId));
    }

    // GET /api/students/class/{classId}/section/{sectionId}
    @GetMapping("/class/{classId}/section/{sectionId}")
    public ResponseEntity<java.util.List<StudentResponse>> getStudentsByClassAndSection(@PathVariable Long classId, @PathVariable Long sectionId) {
        return ResponseEntity.ok(studentService.getStudentsByClassAndSection(classId, sectionId));
    }
}