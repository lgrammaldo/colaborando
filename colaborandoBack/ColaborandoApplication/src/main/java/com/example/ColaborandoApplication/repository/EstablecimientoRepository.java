package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Establecimiento;
import com.example.ColaborandoApplication.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstablecimientoRepository extends JpaRepository<Establecimiento, Integer> {
    Optional<Establecimiento> findByCodigo(String codigo);
    Establecimiento findByUsuario(Usuario usuario);
}
