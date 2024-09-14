package com.example.ClinicaOdontologicaApplication;

import com.example.ClinicaOdontologicaApplication.controller.TurnoController;
import com.example.ClinicaOdontologicaApplication.model.Turno;
import com.example.ClinicaOdontologicaApplication.repository.TurnoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@SpringBootTest
class TurnoControllerTest {

    @Mock
    private TurnoRepository turnoRepository;

    @InjectMocks
    private TurnoController turnoController;

    @Test
    void testGetTurnoByFecha() {
        List<Turno> turnos = new ArrayList<>();

        turnos.add(new Turno());
        turnos.add(new Turno());
        turnos.add(new Turno());

        when(turnoRepository.getFechaTurno()).thenReturn(turnos);

        List<Turno> result = turnoController.getTurnoByFecha();

        assertEquals(turnos, result);

        verify(turnoRepository, times(1)).getFechaTurno();
    }

    @Test
    void testCreateTurno() {
        Turno turno = new Turno();

        when(turnoRepository.save(turno)).thenReturn(turno);

        ResponseEntity<Turno> responseEntity = turnoController.createTurno(turno);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        verify(turnoRepository, times(1)).save(turno);
    }
}
