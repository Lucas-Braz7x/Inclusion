package com.api.inclusion.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.api.inclusion.service.JwtService;
import com.api.inclusion.service.SecurityUserDetailsService;


public class JwtTokenFilter extends OncePerRequestFilter{

	private SecurityUserDetailsService userDetailsService;
	private JwtService jwtService;
	
	public JwtTokenFilter(
			JwtService jwtService, 
			SecurityUserDetailsService userDetailsService) {
		this.jwtService = jwtService;
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	protected void doFilterInternal(
			HttpServletRequest request, 
			HttpServletResponse response, 
			FilterChain filterChain) throws ServletException, IOException {
		
		//Pega o header authorization
		String authorization = request.getHeader("Authorization");
		
		if(authorization != null && authorization.startsWith("Bearer")) {
			String token = authorization.split(" ")[1];
			boolean isTokenValid = jwtService.validarToken(token);
			
			if(isTokenValid) {
				String login = jwtService.obterLoginUsuario(token);
				UserDetails doadorAutenticado = userDetailsService.loadUserByUsername(login);
				UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(
						doadorAutenticado, 
						null, 
						doadorAutenticado.getAuthorities());
				
				user.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(user);
			}
		}
		
		//Dá continuidade à requisição independente do valor
		filterChain.doFilter(request, response);
	}
}

