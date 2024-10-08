package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Establecimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Establecimiento, Integer> {
}
