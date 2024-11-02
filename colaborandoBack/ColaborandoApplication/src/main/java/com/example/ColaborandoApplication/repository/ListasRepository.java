package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Listas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ListasRepository extends JpaRepository<Listas, Integer> {
}
