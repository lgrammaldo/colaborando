package com.example.ColaborandoApplication.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://colaborando.ddns.net", "http://localhost:3000"})
@RestController
@RequestMapping("/sonrisadental/test")
public class TestController {

    @GetMapping("/user")
    @PreAuthorize("hasRol('USER')")
    public String userAccess(){
        return "Vista para USER";
    }

    @GetMapping("/recepcionista")
    @PreAuthorize("hasRol('RECEPCIONISTA')")
    public String recepAccess(){
        return "Vista para RECEPCIONISTA";
    }

    @GetMapping("/odontologo")
    @PreAuthorize("hasRol('ODONTOLOGO')")
    public String odontAccess(){
        return "Vista para ODONTOLOGO";
    }
}
