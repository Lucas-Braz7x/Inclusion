package com.api.inclusion.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.inclusion.model.Doadores;

@Repository
public interface DoadorRepository extends JpaRepository<Doadores, Long>{
	
	boolean existsByEmail(String email);
	
	Optional<Doadores> findByEmail(String email);
}
