package com.example.ClinicaOdontologicaApplication.repository;

import com.example.ClinicaOdontologicaApplication.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

}
