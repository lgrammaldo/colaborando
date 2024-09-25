package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

}
