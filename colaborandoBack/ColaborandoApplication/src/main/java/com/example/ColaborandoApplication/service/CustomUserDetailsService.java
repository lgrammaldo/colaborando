package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        return new org.springframework.security.core.userdetails.User(usuario.getEmail(), usuario.getPassword(),
                new ArrayList<>());
    }

    public Usuario validateUser(String username){
        Usuario usuario = usuarioRepository.findByEmail(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return usuario;
    }

    public boolean AuthenticateUser(String username, String password){
        Usuario usuario = usuarioRepository.findByEmail(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return usuario.getPassword().equals(password);

    }
}
