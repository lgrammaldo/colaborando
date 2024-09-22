package com.example.ClinicaOdontologicaApplication.repository;

import com.example.ClinicaOdontologicaApplication.Entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
}
