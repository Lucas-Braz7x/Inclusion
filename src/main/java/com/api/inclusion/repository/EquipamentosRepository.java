package com.api.inclusion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.inclusion.model.Equipamentos;

@Repository
public interface EquipamentosRepository extends JpaRepository<Equipamentos, Long> {

}
