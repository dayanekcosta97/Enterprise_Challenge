package com.smartlogistics.api.controller;

import com.smartlogistics.api.model.Ocorrencia;
import com.smartlogistics.api.service.OcorrenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias")
@Tag(name = "Ocorrencias", description = "Registro de ocorrencias de entregas")
public class OcorrenciaController {

    private final OcorrenciaService ocorrenciaService;

    public OcorrenciaController(OcorrenciaService ocorrenciaService) {
        this.ocorrenciaService = ocorrenciaService;
    }

    @GetMapping
    @Operation(summary = "Lista todas as ocorrencias")
    public List<Ocorrencia> listar() {
        return ocorrenciaService.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cria uma ocorrencia e atualiza o risco e o ETA da entrega")
    public Ocorrencia criar(@Valid @RequestBody Ocorrencia ocorrencia) {
        return ocorrenciaService.criar(ocorrencia);
    }
}
