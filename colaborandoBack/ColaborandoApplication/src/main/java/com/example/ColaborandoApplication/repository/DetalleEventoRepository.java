package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.DetalleEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DetalleEventoRepository extends JpaRepository<DetalleEvento, Integer> {
}
