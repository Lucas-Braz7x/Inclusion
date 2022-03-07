package com.api.inclusion.service;

import com.api.inclusion.model.Doadores;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

public interface JwtService {
	
	String gerarToken(Doadores doador);
	
	Claims obterClaims(String token) throws ExpiredJwtException;
	
	boolean validarToken(String token);
	
	String obterLoginUsuario(String token);
}
