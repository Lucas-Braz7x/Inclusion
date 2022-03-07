package com.api.inclusion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.inclusion.model.Ongs;

@Repository
public interface OngsRepository extends JpaRepository<Ongs, Long> {

}
