package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Usuario2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository2 extends JpaRepository<Usuario2, Integer> {
    Usuario2 findByEmail(String email);
}
