package com.smartlogistics.api.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Integracao demonstrativa Java 21 / Spring Boot -> Oracle via JDBC.
 * Ativa somente com SPRING_PROFILES_ACTIVE=oracle.
 * Os demais endpoints existentes continuam usando H2 no MVP.
 */
@RestController
@Profile("oracle")
@RequestMapping("/api/oracle")
public class OracleEntregaController {

    @GetMapping("/entregas")
    public List<Map<String, String>> listar(@RequestParam(required = false) String status)
            throws Exception {
        String url = System.getenv("ORACLE_JDBC_URL");
        String user = System.getenv("ORACLE_USER");
        String password = System.getenv("ORACLE_PASSWORD");

        if (url == null || user == null || password == null) {
            throw new IllegalStateException("Configuracao Oracle nao informada");
        }

        List<Map<String, String>> entregas = new ArrayList<>();
        try (Connection connection = DriverManager.getConnection(url, user, password);
             CallableStatement call = connection.prepareCall(
                     "{ call PKG_SMART_HAS.PRC_BUSCAR_ENTREGAS(?, ?) }")) {
            call.setString(1, status);
            call.registerOutParameter(2, Types.REF_CURSOR);
            call.execute();
            try (ResultSet rs = (ResultSet) call.getObject(2)) {
                while (rs.next()) {
                    Map<String, String> entrega = new LinkedHashMap<>();
                    entrega.put("numero", rs.getString("NUMERO"));
                    entrega.put("status", rs.getString("STATUS"));
                    entrega.put("risco", rs.getString("RISCO"));
                    entregas.add(entrega);
                }
            }
        }
        return entregas;
    }
}
