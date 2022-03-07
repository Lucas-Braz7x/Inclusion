package com.api.inclusion.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.api.inclusion.model.Doadores;
import com.api.inclusion.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtSecurity implements JwtService {

	@Value("${jwt.expiracao}")
	private String expiracaoToken;
	
	@Value("${jwt.chave-assinatura}")
	private String chaveAssinatura;
	
	@Override
	public String gerarToken(Doadores doador) {
		
		int expToken = Integer.valueOf(expiracaoToken);
		
		//Transforma o tempo de expiração para data e formata em hh:mm
		LocalDateTime dataHoraExpiracao = LocalDateTime.now().plusMinutes(expToken);
		Instant instant = dataHoraExpiracao.atZone(ZoneId.systemDefault()).toInstant();
		
		Date data = Date.from(instant);
		
		String horaExpiracaoToken = dataHoraExpiracao.toLocalTime()
				.format(DateTimeFormatter.ofPattern("HH:mm"));
		
		//Informações contidas no token
		String token = Jwts.builder()
				.setExpiration(data)
				.setSubject(doador.getEmail())
				.claim("id", doador.getId())
				.claim("nome", doador.getNomeDoador())
				.claim("idade", doador.getIdade())
				.claim("telefone", doador.getTelefone())
				.claim("cep", doador.getCep())
				.claim("endereco", doador.getEndereco())
				.claim("estado", doador.getEstado())
				.claim("role", doador.getRole())
				.claim("horaExpiracaoToken", horaExpiracaoToken)
				.signWith(SignatureAlgorithm.HS512, chaveAssinatura)
				.compact();
		
		return token;
	}

	//Pega as informações do token
	//Decodifica e retorna 
	@Override
	public Claims obterClaims(String token) throws ExpiredJwtException {
		
		return Jwts.parser()
				.setSigningKey(chaveAssinatura)
				.parseClaimsJws(token)
				.getBody();
	}

	
	@Override
	public boolean validarToken(String token) {
		
		try {
			Claims claims = obterClaims(token);
			Date dataExpiracao = claims.getExpiration();
			LocalDateTime dataExpFormatada = dataExpiracao.toInstant()
												.atZone(ZoneId.systemDefault())
												.toLocalDateTime();
			boolean dataHoraAtualIsAfter = LocalDateTime.now().isAfter(dataExpFormatada);
			return !dataHoraAtualIsAfter;
			
		} catch (ExpiredJwtException e) {
			return false;
		}
	}

	@Override
	public String obterLoginUsuario(String token) {
		
		Claims claims = obterClaims(token);
		return claims.getSubject();
	}

}
