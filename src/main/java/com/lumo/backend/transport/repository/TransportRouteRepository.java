package com.lumo.backend.transport.repository;

import com.lumo.backend.transport.entity.TransportRoute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportRouteRepository extends JpaRepository<TransportRoute, Long> {
}
