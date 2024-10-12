package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
}
