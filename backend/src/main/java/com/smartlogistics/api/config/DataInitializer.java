package com.smartlogistics.api.config;

import com.smartlogistics.api.model.Entrega;
import com.smartlogistics.api.repository.EntregaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner carregarDadosDemonstracao(EntregaRepository entregaRepository) {
        return args -> {
            if (!entregaRepository.existsByNumero("ENT0001051")) {
                Entrega entrega = new Entrega();
                entrega.setNumero("ENT0001051");
                entrega.setCliente("Cliente Demo");
                entrega.setOrigem("Contagem/MG");
                entrega.setDestino("Belo Horizonte/MG");
                entrega.setStatus("EM_TRANSPORTE");
                entrega.setRisco("BAIXO");
                entrega.setEta(LocalDateTime.now().plusHours(4));
                entregaRepository.save(entrega);
            }
        };
    }
}
