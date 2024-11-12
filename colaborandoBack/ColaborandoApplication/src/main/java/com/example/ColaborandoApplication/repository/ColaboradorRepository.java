package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.Evento;
import com.example.ColaborandoApplication.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Integer> {
    Colaborador findByUsuario(Usuario usuario);


    //@Query("SELECT e FROM Colaborador e WHERE e.id_usuario = :id_Usuario")
    //Colaborador findByColaboradorUserId(@Param("id_Usuario") Integer id_Usuario);

}
