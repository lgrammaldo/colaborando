package com.example.ClinicaOdontologicaApplication.repository;

import com.example.ClinicaOdontologicaApplication.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByNombre(Roles name);
}
