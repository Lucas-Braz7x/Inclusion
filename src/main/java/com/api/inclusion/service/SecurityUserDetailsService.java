package com.api.inclusion.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.api.inclusion.model.Doadores;
import com.api.inclusion.repository.DoadorRepository;


@Repository
public class SecurityUserDetailsService implements UserDetailsService{

	@Autowired
	private DoadorRepository doadorRepository;
	
	
	//@Transactional
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Doadores doadorEncontrado = doadorRepository
								.findByEmail(email)
								.orElseThrow(() -> new UsernameNotFoundException("Email não cadastrado"));
	
		//Dispensa a implementação da classe userDetails
		//Esse trecho tranforma em userDetails
		User user = (User) User.builder()
								.username(doadorEncontrado.getEmail())
								.password(doadorEncontrado.getSenha())
								.roles(doadorEncontrado.getRole())
								.build();
		
		return user;
	}
}
