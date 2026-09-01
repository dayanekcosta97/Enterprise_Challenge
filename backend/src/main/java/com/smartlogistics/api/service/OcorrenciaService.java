package com.smartlogistics.api.service;

import com.smartlogistics.api.exception.RecursoNaoEncontradoException;
import com.smartlogistics.api.model.Entrega;
import com.smartlogistics.api.model.Ocorrencia;
import com.smartlogistics.api.repository.EntregaRepository;
import com.smartlogistics.api.repository.OcorrenciaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class OcorrenciaService {

    private static final Set<String> SEVERIDADES_DE_ALTO_RISCO = Set.of("ALTA", "CRITICA");

    private final OcorrenciaRepository ocorrenciaRepository;
    private final EntregaRepository entregaRepository;

    public OcorrenciaService(
            OcorrenciaRepository ocorrenciaRepository,
            EntregaRepository entregaRepository) {
        this.ocorrenciaRepository = ocorrenciaRepository;
        this.entregaRepository = entregaRepository;
    }

    @Transactional(readOnly = true)
    public List<Ocorrencia> listar() {
        return ocorrenciaRepository.findAll();
    }

    @Transactional
    public Ocorrencia criar(Ocorrencia ocorrencia) {
        Entrega entrega = entregaRepository.findById(ocorrencia.getEntregaId())
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Entrega nao encontrada: " + ocorrencia.getEntregaId()));

        String severidadeNormalizada = ocorrencia.getSeveridade().trim().toUpperCase(Locale.ROOT);
        ocorrencia.setSeveridade(severidadeNormalizada);

        if (SEVERIDADES_DE_ALTO_RISCO.contains(severidadeNormalizada)) {
            entrega.setRisco("ALTO");
        }

        if (ocorrencia.getTempoAdicionalMinutos() > 0) {
            entrega.setEta(entrega.getEta().plusMinutes(ocorrencia.getTempoAdicionalMinutos()));
        }

        entregaRepository.save(entrega);
        ocorrencia.setId(null);
        return ocorrenciaRepository.save(ocorrencia);
    }
}
