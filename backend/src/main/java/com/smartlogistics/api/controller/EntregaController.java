package com.smartlogistics.api.controller;

import com.smartlogistics.api.model.Entrega;
import com.smartlogistics.api.service.EntregaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/entregas")
@Tag(name = "Entregas", description = "Gerenciamento de entregas")
public class EntregaController {

    private final EntregaService entregaService;

    public EntregaController(EntregaService entregaService) {
        this.entregaService = entregaService;
    }

    @GetMapping
    @Operation(summary = "Lista todas as entregas")
    public List<Entrega> listar() {
        return entregaService.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca uma entrega por ID")
    public Entrega buscarPorId(@PathVariable Long id) {
        return entregaService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cria uma entrega")
    public Entrega criar(@Valid @RequestBody Entrega entrega) {
        return entregaService.criar(entrega);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma entrega")
    public Entrega atualizar(@PathVariable Long id, @Valid @RequestBody Entrega entrega) {
        return entregaService.atualizar(id, entrega);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma entrega")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        entregaService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
