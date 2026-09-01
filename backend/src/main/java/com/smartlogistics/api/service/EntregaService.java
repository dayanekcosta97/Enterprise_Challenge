package com.smartlogistics.api.service;

import com.smartlogistics.api.exception.ConflitoException;
import com.smartlogistics.api.exception.RecursoNaoEncontradoException;
import com.smartlogistics.api.model.Entrega;
import com.smartlogistics.api.repository.EntregaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EntregaService {

    private final EntregaRepository entregaRepository;

    public EntregaService(EntregaRepository entregaRepository) {
        this.entregaRepository = entregaRepository;
    }

    @Transactional(readOnly = true)
    public List<Entrega> listar() {
        return entregaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Entrega buscarPorId(Long id) {
        return entregaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Entrega nao encontrada: " + id));
    }

    @Transactional
    public Entrega criar(Entrega entrega) {
        entrega.setId(null);
        if (entregaRepository.existsByNumero(entrega.getNumero())) {
            throw new ConflitoException("Ja existe uma entrega com o numero " + entrega.getNumero());
        }
        return entregaRepository.save(entrega);
    }

    @Transactional
    public Entrega atualizar(Long id, Entrega dados) {
        Entrega entrega = buscarPorId(id);
        entrega.setNumero(dados.getNumero());
        entrega.setCliente(dados.getCliente());
        entrega.setOrigem(dados.getOrigem());
        entrega.setDestino(dados.getDestino());
        entrega.setStatus(dados.getStatus());
        entrega.setRisco(dados.getRisco());
        entrega.setEta(dados.getEta());
        return entregaRepository.save(entrega);
    }

    @Transactional
    public void excluir(Long id) {
        Entrega entrega = buscarPorId(id);
        entregaRepository.delete(entrega);
    }
}
