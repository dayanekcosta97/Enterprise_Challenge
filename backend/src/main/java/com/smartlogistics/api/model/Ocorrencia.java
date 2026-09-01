package com.smartlogistics.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "ocorrencias")
public class Ocorrencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "O ID da entrega e obrigatorio")
    private Long entregaId;

    @NotBlank(message = "O tipo e obrigatorio")
    @Size(max = 80, message = "O tipo deve ter no maximo 80 caracteres")
    @Column(nullable = false, length = 80)
    private String tipo;

    @NotBlank(message = "A severidade e obrigatoria")
    @Size(max = 30, message = "A severidade deve ter no maximo 30 caracteres")
    @Column(nullable = false, length = 30)
    private String severidade;

    @NotBlank(message = "A descricao e obrigatoria")
    @Size(max = 500, message = "A descricao deve ter no maximo 500 caracteres")
    @Column(nullable = false, length = 500)
    private String descricao;

    @NotNull(message = "O tempo adicional e obrigatorio")
    @Min(value = 0, message = "O tempo adicional nao pode ser negativo")
    @Column(nullable = false)
    private Integer tempoAdicionalMinutos;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getEntregaId() { return entregaId; }
    public void setEntregaId(Long entregaId) { this.entregaId = entregaId; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getSeveridade() { return severidade; }
    public void setSeveridade(String severidade) { this.severidade = severidade; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public Integer getTempoAdicionalMinutos() { return tempoAdicionalMinutos; }
    public void setTempoAdicionalMinutos(Integer tempoAdicionalMinutos) { this.tempoAdicionalMinutos = tempoAdicionalMinutos; }
}
