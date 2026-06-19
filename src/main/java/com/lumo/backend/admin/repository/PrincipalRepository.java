package com.lumo.backend.admin.repository;

import com.lumo.backend.admin.entity.Principal;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrincipalRepository extends JpaRepository<Principal, Long> {

    Optional<Principal> findByEmailId(String emailId);
}
