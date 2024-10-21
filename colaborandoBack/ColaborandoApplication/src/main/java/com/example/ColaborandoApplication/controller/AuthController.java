package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.jwt.JwtTokenUtil;
import com.example.ColaborandoApplication.model.JwtRequest;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/colaborando")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/login")
    public Map<String, String> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword())
            );

        }catch (Exception e){
            throw new Exception("usuario invalido");
        }

        Usuario user = userDetailsService.validateUser(jwtRequest.getEmail());
        Map<String, String> data = new HashMap<>();
        data.put("token", jwtTokenUtil.generateToken(jwtRequest.getEmail()));
        data.put("rol", user.getTipoUsuario());
        data.put("userID", String.valueOf(user.getId()));
        return data;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        // Extraer el token de la cabecera "Authorization"
        String jwtToken = token.substring(7);
        // Invalidar el token
        jwtTokenUtil.invalidateToken(jwtToken);
        // Retornar una respuesta exitosa
        return ResponseEntity.ok().body("Logout exitoso");
    }
}
