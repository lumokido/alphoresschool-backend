package com.lumo.backend.transport.service;

import com.lumo.backend.transport.dto.TransportRouteRequest;
import com.lumo.backend.transport.dto.StudentTransportRequest;
import com.lumo.backend.transport.entity.TransportRoute;
import com.lumo.backend.transport.entity.StudentTransport;
import com.lumo.backend.transport.repository.TransportRouteRepository;
import com.lumo.backend.transport.repository.StudentTransportRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TransportService {

    private final TransportRouteRepository routeRepository;
    private final StudentTransportRepository studentTransportRepository;

    public TransportService(
            TransportRouteRepository routeRepository,
            StudentTransportRepository studentTransportRepository) {
        this.routeRepository = routeRepository;
        this.studentTransportRepository = studentTransportRepository;
    }

    public TransportRoute createRoute(TransportRouteRequest request) {
        TransportRoute route = new TransportRoute();
        route.setRouteName(request.routeName());
        route.setBusNumber(request.busNumber());
        route.setPickupTime(request.pickupTime());
        route.setDropTime(request.dropTime());
        return routeRepository.save(route);
    }

    public StudentTransport assignStudentToRoute(StudentTransportRequest request) {
        TransportRoute route = routeRepository.findById(request.routeId())
                .orElseThrow(() -> new IllegalArgumentException("Route not found: " + request.routeId()));

        StudentTransport assignment = studentTransportRepository.findByStudentId(request.studentId())
                .orElse(new StudentTransport());

        assignment.setStudentId(request.studentId());
        assignment.setRoute(route);
        return studentTransportRepository.save(assignment);
    }

    public List<TransportRoute> getAllRoutes() {
        return routeRepository.findAll();
    }

    public StudentTransport getStudentRoute(String studentId) {
        return studentTransportRepository.findByStudentId(studentId).orElse(null);
    }
}
