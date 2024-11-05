package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByStatus(String status);
}
