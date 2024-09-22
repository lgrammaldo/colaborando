package com.example.ClinicaOdontologicaApplication.service;

import com.example.ClinicaOdontologicaApplication.Entity.Usuario2;
import com.example.ClinicaOdontologicaApplication.repository.UsuarioRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository2 usuarioRepository2;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario2 usuario = usuarioRepository2.findByEmail(email);
        if (usuario == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        return new org.springframework.security.core.userdetails.User(usuario.getEmail(), usuario.getPassword(),
                new ArrayList<>());
    }

    public Usuario2 validateUser(String username){
        Usuario2 usuario = usuarioRepository2.findByEmail(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return usuario;
    }

    public boolean AuthenticateUser(String username, String password){
        Usuario2 usuario = usuarioRepository2.findByEmail(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return usuario.getPassword().equals(password);

    }
}
