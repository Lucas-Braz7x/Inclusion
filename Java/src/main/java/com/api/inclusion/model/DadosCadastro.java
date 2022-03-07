package com.api.inclusion.model;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class DadosCadastro {
	
	@Column(nullable = false, unique = true, length = 60)
	private String email;
	
	@Column(nullable = false, length = 11)
	private String telefone;
	
	@Column(nullable = false, length=9)
	private String cep;
	
	@Column(nullable = false, length = 120)
	private String endereco;
	
	@Column(nullable = false, length = 2)
	private String estado;
	
	@Column(nullable = false)
	private String senha;
	
	@Column(nullable = false)
	private String role;
}
