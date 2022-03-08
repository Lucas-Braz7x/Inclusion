package com.api.inclusion.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.inclusion.model.Equipamentos;

@Repository
public interface EquipamentosRepository extends JpaRepository<Equipamentos, Long> {

	String findByNomeEquipamento(String nomeEquipamento);
	
	List<Equipamentos> findByDoador(Long id);
}
