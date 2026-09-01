package com.smartlogistics.api;

import com.smartlogistics.api.model.Entrega;
import com.smartlogistics.api.model.Ocorrencia;
import com.smartlogistics.api.repository.EntregaRepository;
import com.smartlogistics.api.service.OcorrenciaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
class SmartLogisticsApiApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EntregaRepository entregaRepository;

    @Autowired
    private OcorrenciaService ocorrenciaService;

    @Test
    void deveExporStatusPublicamente() throws Exception {
        mockMvc.perform(get("/status"))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Smart Logistics API")))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Online")));
    }

    @Test
    void deveProtegerApiEPermitirAcessoComBasicAuth() throws Exception {
        mockMvc.perform(get("/api/entregas"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/api/entregas")
                        .with(httpBasic("admin", "admin123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].numero").value("ENT0001051"));
    }

    @Test
    void deveValidarDadosDaEntrega() throws Exception {
        mockMvc.perform(post("/api/entregas")
                        .with(httpBasic("admin", "admin123"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.numero").exists())
                .andExpect(jsonPath("$.validationErrors.eta").exists());
    }

    @Test
    @Transactional
    void deveAtualizarRiscoEEtaAoCriarOcorrenciaCritica() {
        Entrega entrega = entregaRepository.findAll().getFirst();
        LocalDateTime etaAnterior = entrega.getEta();

        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setEntregaId(entrega.getId());
        ocorrencia.setTipo("ATRASO");
        ocorrencia.setSeveridade("critica");
        ocorrencia.setDescricao("Interdicao na rota");
        ocorrencia.setTempoAdicionalMinutos(45);

        Ocorrencia criada = ocorrenciaService.criar(ocorrencia);
        Entrega atualizada = entregaRepository.findById(entrega.getId()).orElseThrow();

        assertThat(criada.getId()).isNotNull();
        assertThat(criada.getSeveridade()).isEqualTo("CRITICA");
        assertThat(atualizada.getRisco()).isEqualTo("ALTO");
        assertThat(atualizada.getEta()).isEqualTo(etaAnterior.plusMinutes(45));
    }
}
