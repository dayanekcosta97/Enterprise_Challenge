# Smart HAS — entrega FIAP (03/11/2026)

**Repositório:** dayanekcosta97/Enterprise_Challenge  
**Branch:** feature/smart-has-mobile  
**Escopo:** consolidação Oracle PL/SQL, CI/CD e testes.

## Arquivos implementados

| Caminho | Objetivo |
|---|---|
| `database/01_schema.sql` | Cria tabelas SMH_ENTREGA e SMH_AUDITORIA |
| `database/02_package.sql` | Package PKG_SMART_HAS: function de prioridade, procedure de status e Dynamic SQL com bind |
| `database/03_trigger.sql` | Trigger de auditoria a cada mudança de status |
| `database/04_testes.sql` | Teste de function, procedure, trigger e consulta dinâmica |
| `backend/src/main/java/com/smartlogistics/api/controller/OracleEntregaController.java` | API REST de demonstração integrada ao Oracle via JDBC |
| `backend/pom.xml` | Dependência de runtime ojdbc11 para Oracle |
| `.github/workflows/ci-smart-has.yml` | Build, JUnit, Oracle Free, SQL, teste da API e artefatos |

## O que falta fazer no GitHub

1. Abra o repositório, menu **Settings** > **Secrets and variables** > **Actions**.
2. Clique em **New repository secret**.
3. Cadastre **Name**: `ORACLE_APP_PASSWORD`.
4. Defina uma senha forte e não a compartilhe em chats, prints ou no repositório. Para este workflow, prefira uma senha aleatória com letras e números sem espaços, aspas ou caracteres de shell.
5. Abra **Actions** > **Smart HAS - CI/CD academico** > **Run workflow**.
6. No seletor, escolha a branch `feature/smart-has-mobile` e execute.
7. Confirme que as etapas de Maven, Oracle, PL/SQL e API concluíram sem erros. Não declare sucesso antes disso.

**Observação:** o primeiro push dos arquivos pode disparar uma execução antes do cadastro do secret. Nesse caso, é esperado que a etapa de verificação do segredo falhe. Depois de cadastrar o segredo, inicie manualmente uma nova execução na branch correta.

## Evidências sugeridas para a atividade

- Print da árvore da branch com os arquivos `database/` e `.github/workflows/`.
- Log do `mvn ... clean verify` mostrando build e testes JUnit.
- Log Oracle contendo `OK: Package, function, procedure, trigger e Dynamic SQL`.
- Consulta `SELECT * FROM SMH_AUDITORIA` no log SQL (mudança CRIADA -> EM_TRANSITO).
- Resposta da API `/api/oracle/entregas?status=EM_TRANSITO` com a entrega `ENT001`.
- Print do ServiceNow Smart HAS funcionando (demonstração do aplicativo).
- Artefato da execução GitHub Actions: `evidencias-smart-has`.

## O que foi implementado e o que não foi

- A aplicação Java existente continua usando **H2** nas rotas originais e nos testes JUnit.
- O novo endpoint `/api/oracle/entregas` consulta Oracle via JDBC, chamando o package.
- O Oracle Free e o backend são iniciados **temporariamente no runner GitHub Actions**; isso demonstra deploy de homologação, não publicação permanente em produção.
- **Não houve alteração no aplicativo ServiceNow** nesta atividade.
- O pipeline só estará comprovadamente funcionando após uma execução concluída com êxito.

## Como apresentar em 5 minutos

1. Mostre o aplicativo Smart HAS no ServiceNow (produto).
2. Explique a auditoria e a classificação de risco no package PL/SQL.
3. Abra a branch e os scripts SQL.
4. Abra o GitHub Actions e mostre build, testes e API Oracle.
5. Conclua informando os limites da integração demonstrativa e as melhorias futuras.

## Resumo para a documentação

A consolidação do Smart HAS acrescentou ao projeto um package Oracle PL/SQL reutilizável, com procedures de alteração de status e consulta dinâmica parametrizada, além de uma function para classificar prioridades. Uma trigger de auditoria registra mudanças de status automaticamente. O GitHub Actions foi configurado para compilar e testar o backend Spring Boot, provisionar Oracle Free temporário, executar scripts e testes PL/SQL, iniciar a aplicação Java e testar o endpoint JDBC. O aplicativo principal ServiceNow foi preservado, enquanto a integração Oracle foi adicionada como prova de conceito acadêmica.
