package com.smartlogistics.api.repository;

import com.smartlogistics.api.model.Entrega;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntregaRepository extends JpaRepository<Entrega, Long> {

    boolean existsByNumero(String numero);
}
