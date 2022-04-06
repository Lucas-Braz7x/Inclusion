package com.api.inclusion.service;

import com.api.inclusion.model.Doadores;
import com.api.inclusion.model.Ongs;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

public interface JwtService {
	
	String gerarToken(Doadores doador);
	
	String gerarToken(Ongs ong);
	
	Claims obterClaims(String token) throws ExpiredJwtException;
	
	boolean validarToken(String token);
	
	String obterLoginUsuario(String token);
}
