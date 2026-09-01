package com.smartlogistics.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "entregas")
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O numero da entrega e obrigatorio")
    @Size(max = 50, message = "O numero deve ter no maximo 50 caracteres")
    @Column(nullable = false, unique = true, length = 50)
    private String numero;

    @NotBlank(message = "O cliente e obrigatorio")
    @Size(max = 150, message = "O cliente deve ter no maximo 150 caracteres")
    @Column(nullable = false, length = 150)
    private String cliente;

    @NotBlank(message = "A origem e obrigatoria")
    @Size(max = 150, message = "A origem deve ter no maximo 150 caracteres")
    @Column(nullable = false, length = 150)
    private String origem;

    @NotBlank(message = "O destino e obrigatorio")
    @Size(max = 150, message = "O destino deve ter no maximo 150 caracteres")
    @Column(nullable = false, length = 150)
    private String destino;

    @NotBlank(message = "O status e obrigatorio")
    @Size(max = 50, message = "O status deve ter no maximo 50 caracteres")
    @Column(nullable = false, length = 50)
    private String status;

    @NotBlank(message = "O risco e obrigatorio")
    @Size(max = 30, message = "O risco deve ter no maximo 30 caracteres")
    @Column(nullable = false, length = 30)
    private String risco;

    @NotNull(message = "O ETA e obrigatorio")
    @Future(message = "O ETA deve estar no futuro")
    @Column(nullable = false)
    private LocalDateTime eta;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }
    public String getOrigem() { return origem; }
    public void setOrigem(String origem) { this.origem = origem; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRisco() { return risco; }
    public void setRisco(String risco) { this.risco = risco; }
    public LocalDateTime getEta() { return eta; }
    public void setEta(LocalDateTime eta) { this.eta = eta; }
}
