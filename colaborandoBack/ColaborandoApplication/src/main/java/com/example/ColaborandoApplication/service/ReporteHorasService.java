package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.repository.ReporteHorasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
public class ReporteHorasService {

    @Autowired
    private ReporteHorasRepository reporteHorasRepository;



    public List<ReporteHoras> getHorasColaborador(Integer colaborador){
        try{
            List<ReporteHoras> horas = reporteHorasRepository.findByHorasColaborador(colaborador);
            return horas;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

    public List<ReporteHoras> getHorasEmpresa(){
        try{
            List<ReporteHoras> horas = reporteHorasRepository.findAll();
            return horas;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

}
