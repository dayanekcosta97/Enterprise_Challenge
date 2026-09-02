# Evidências de funcionamento — Smart Logistics API

Data da execução: 02/09/2026

## Ambiente utilizado

- Backend: Spring Boot e Java 21 em `http://localhost:8080`
- Frontend: Angular em `http://localhost:4200`
- Autenticação: HTTP Basic (`admin` / `admin123`)
- Banco: H2 em memória

> O banco foi configurado com `jdbc:h2:mem:smartlogistics` e `spring.jpa.hibernate.ddl-auto=create-drop`. Portanto, os dados cadastrados existem enquanto o backend está em execução e são recriados quando ele é reiniciado. Esse comportamento atende ao requisito de banco H2 em memória.

## Script PowerShell para autenticação

```powershell
$credenciais = 'admin:admin123'
$token = [Convert]::ToBase64String(
    [Text.Encoding]::ASCII.GetBytes($credenciais)
)
$headers = @{ Authorization = "Basic $token" }
```

## Evidência 1 — criação de entrega

Script executado pelo mesmo caminho usado pelo painel Angular:

```powershell
$entrega = @{
    numero = 'ENT0001053'
    cliente = 'Empresa Acadêmica'
    origem = 'Betim/MG'
    destino = 'Nova Lima/MG'
    status = 'EM_TRANSPORTE'
    risco = 'BAIXO'
    eta = '2026-09-03T14:30:00'
} | ConvertTo-Json

Invoke-WebRequest `
    -Uri 'http://localhost:4200/api/entregas' `
    -Method Post `
    -Headers $headers `
    -ContentType 'application/json' `
    -Body $entrega
```

Retorno obtido:

```text
HTTP/1.1 201 Created
```

```json
{
  "id": 4,
  "numero": "ENT0001053",
  "cliente": "Empresa Acadêmica",
  "origem": "Betim/MG",
  "destino": "Nova Lima/MG",
  "status": "EM_TRANSPORTE",
  "risco": "BAIXO",
  "eta": "2026-09-03T14:30:00"
}
```

O código HTTP `201 Created` comprova que o recurso foi persistido com sucesso.

## Evidência 2 — consulta da entrega criada

```powershell
Invoke-WebRequest `
    -Uri 'http://localhost:4200/api/entregas/4' `
    -Headers $headers
```

Retorno obtido:

```text
HTTP/1.1 200 OK
```

```json
{
  "id": 4,
  "numero": "ENT0001053",
  "cliente": "Empresa Acadêmica",
  "origem": "Betim/MG",
  "destino": "Nova Lima/MG",
  "status": "EM_TRANSPORTE",
  "risco": "BAIXO",
  "eta": "2026-09-03T14:30:00"
}
```

O código `200 OK`, junto do mesmo ID e número, comprova que a entrega pode ser recuperada depois do cadastro.

## Evidência 3 — listagem de entregas

```powershell
Invoke-RestMethod `
    -Uri 'http://localhost:4200/api/entregas' `
    -Headers $headers
```

Resumo do retorno obtido:

```text
TOTAL=3
ID=1 NUMERO=ENT0001051 CLIENTE=Cliente Demo
ID=3 NUMERO=ENT0001052 CLIENTE=Mercado Central
ID=4 NUMERO=ENT0001053 CLIENTE=Empresa Acadêmica
```

## Evidência 4 — validação de número duplicado

Ao repetir o `POST` com o número `ENT0001053`, a API recusou a duplicidade:

```text
HTTP/1.1 409 Conflict
```

```json
{
  "status": 409,
  "error": "Conflict",
  "message": "Ja existe uma entrega com o numero ENT0001053",
  "path": "/api/entregas",
  "validationErrors": {}
}
```

Essa validação garante a unicidade do campo `numero`.

## Evidência 5 — validação do ETA

Uma tentativa com ETA no passado (`2020-01-01T10:00:00`) retornou:

```text
HTTP/1.1 400 Bad Request
```

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Dados invalidos",
  "path": "/api/entregas",
  "validationErrors": {
    "eta": "O ETA deve estar no futuro"
  }
}
```

## Evidência 6 — regra de negócio de ocorrência

Script:

```powershell
$ocorrencia = @{
    entregaId = 4
    tipo = 'ATRASO_OPERACIONAL'
    severidade = 'ALTA'
    descricao = 'Congestionamento severo na rota'
    tempoAdicionalMinutos = 30
} | ConvertTo-Json

Invoke-WebRequest `
    -Uri 'http://localhost:4200/api/ocorrencias' `
    -Method Post `
    -Headers $headers `
    -ContentType 'application/json' `
    -Body $ocorrencia
```

Retorno da ocorrência:

```text
HTTP/1.1 201 Created
```

```json
{
  "id": 1,
  "entregaId": 4,
  "tipo": "ATRASO_OPERACIONAL",
  "severidade": "ALTA",
  "descricao": "Congestionamento severo na rota",
  "tempoAdicionalMinutos": 30
}
```

Estado da entrega após aplicar a regra:

```json
{
  "id": 4,
  "numero": "ENT0001053",
  "risco": "ALTO",
  "eta": "2026-09-03T15:00:00"
}
```

A severidade `ALTA` alterou o risco de `BAIXO` para `ALTO`, e os 30 minutos adicionais mudaram o ETA de `14:30` para `15:00`.

## Comandos equivalentes com cURL

Listar entregas:

```powershell
curl.exe -i -u admin:admin123 http://localhost:8080/api/entregas
```

Consultar a documentação Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

Consultar o H2 Console:

```text
http://localhost:8080/h2-console
```

Configuração do H2 Console:

```text
JDBC URL: jdbc:h2:mem:smartlogistics
User Name: sa
Password: (em branco)
```

## Evidência 7 — testes automatizados

Comando executado no diretório `backend`:

```powershell
mvn test
```

Resumo gerado pelo Maven Surefire:

```text
Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
```

O resultado demonstra que o contexto Spring Boot e os testes de integração existentes foram executados sem falhas.
