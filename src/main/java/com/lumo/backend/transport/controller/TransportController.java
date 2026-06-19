package com.lumo.backend.transport.controller;

import com.lumo.backend.transport.dto.TransportRouteRequest;
import com.lumo.backend.transport.dto.StudentTransportRequest;
import com.lumo.backend.transport.entity.TransportRoute;
import com.lumo.backend.transport.entity.StudentTransport;
import com.lumo.backend.transport.service.TransportService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transport")
public class TransportController {

    private final TransportService transportService;

    public TransportController(TransportService transportService) {
        this.transportService = transportService;
    }

    @PostMapping("/routes")
    public ResponseEntity<TransportRoute> createRoute(@RequestBody TransportRouteRequest request) {
        return ResponseEntity.ok(transportService.createRoute(request));
    }

    @PostMapping("/assign")
    public ResponseEntity<StudentTransport> assignStudent(@RequestBody StudentTransportRequest request) {
        return ResponseEntity.ok(transportService.assignStudentToRoute(request));
    }

    @GetMapping("/routes")
    public ResponseEntity<List<TransportRoute>> getAllRoutes() {
        return ResponseEntity.ok(transportService.getAllRoutes());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<StudentTransport> getStudentRoute(@PathVariable String studentId) {
        StudentTransport assignment = transportService.getStudentRoute(studentId);
        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(assignment);
    }
}
