# Smart Logistics 5.0

Projeto desenvolvido para o **Enterprise Challenge 2026 — FIAP**, no contexto do **Smart HAS AI Logistics Extension**, com foco em gestão inteligente e proativa de entregas.

O Smart Logistics 5.0 foi desenvolvido sobre a plataforma **ServiceNow App Engine** e tem como objetivo centralizar o acompanhamento logístico, registrar ocorrências, atualizar previsões de entrega, identificar riscos de atraso e automatizar a comunicação com o cliente.

---

## Sobre o projeto

Em operações logísticas, atrasos e ocorrências muitas vezes são identificados de forma reativa, quando o cliente já foi impactado.

O Smart Logistics 5.0 foi criado para transformar eventos operacionais em ações automáticas, permitindo:

- acompanhar o ciclo completo da entrega;
- registrar atualizações de Tracking;
- registrar ocorrências logísticas;
- recalcular o ETA da entrega;
- classificar o risco de atraso;
- automatizar notificações ao cliente;
- integrar sistemas externos por meio de API REST;
- manter um histórico auditável das atualizações.

---

## Problema

Entre os principais desafios identificados estão:

- baixa visibilidade sobre o andamento das entregas;
- informações distribuídas entre diferentes sistemas;
- comunicação tardia com o cliente;
- dificuldade em antecipar riscos de atraso;
- ausência de uma visão centralizada das ocorrências logísticas;
- necessidade de atualização manual das previsões de entrega.

A proposta do Smart Logistics 5.0 é atuar de forma mais proativa, utilizando os eventos recebidos durante o transporte para atualizar a situação da entrega e acionar automações.

---

## Arquitetura da solução

Fluxo simplificado da solução:

```text
Sistema externo / Transportadora
              |
              | JSON / REST
              v
     Scripted REST API
              |
              v
      Smart Logistics 5.0
              |
      +-------+-------+
      |               |
   Tracking       Ocorrência
      |               |
      +-------+-------+
              |
       Business Rules
              |
         ETA + Risco
              |
        Flow Designer
              |
       E-mail ao cliente
