package com.api.inclusion.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Equipamentos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 50)
	private String nomeEquipamento;
	
	@Column(nullable = false, length = 50)
	private String descricao;
	
	@Column(nullable = true)
	private String imageUrl;
	
	@Column(nullable = true)
	private String imageHasDelete;
	
	@Column(nullable = true)
	private String tipoDeficiencia;

	@ManyToOne
	@JoinColumn(name="Doadores", nullable = false)
	private Doadores doador;

}
