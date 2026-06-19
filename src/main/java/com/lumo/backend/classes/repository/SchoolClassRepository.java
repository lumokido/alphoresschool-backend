package com.lumo.backend.classes.repository;

import com.lumo.backend.classes.entity.SchoolClass;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    Optional<SchoolClass> findByName(String name);
}
