# Smart Logistics 5.0 — Dashboard Angular

Dashboard administrativo para acompanhar entregas, indicadores operacionais e novos cadastros consumindo a **Smart Logistics API** disponível em `backend/`.

## Requisitos

- Node.js 22.12 ou superior
- npm 10 ou superior
- Backend Spring Boot executando em `http://localhost:8080`

O projeto usa Angular 21, TypeScript, Angular Router, `HttpClient`, `FormsModule` e CSS próprio. Nenhuma biblioteca visual externa foi adicionada.

## Como executar

Em um terminal, inicie o backend:

```bash
cd backend
mvn spring-boot:run
```

Em outro terminal, inicie o frontend:

```bash
cd web
npm install
npm start
```

Acesse `http://localhost:4200`. Para gerar a versão de produção:

```bash
npm run build
```

## Rotas

| Rota | Função |
| --- | --- |
| `/home` | Dashboard com indicadores e entregas recentes |
| `/entregas` | Tabela de entregas e exclusão com confirmação |
| `/admin` | Formulário para cadastrar uma nova entrega |
| `/` | Redireciona para `/home` |

## Integração com o Spring Boot

O `EntregaService` consome `http://localhost:8080/api/entregas` e implementa:

- `listar()`
- `buscarPorId()`
- `criar()`
- `atualizar()`
- `excluir()`

A API utiliza autenticação HTTP Basic com `admin` / `admin123`. Para este MVP acadêmico, o cabeçalho `Authorization` é montado diretamente no service. Isso é adequado somente para a demonstração local; credenciais não devem ficar no código-fonte em produção.

O backend aceita CORS exclusivamente da origem `http://localhost:4200` nos endpoints `/api/**`.

## Recursos Angular demonstrados

- **Interpolação `{{ }}`:** títulos, indicadores, dados da tabela e mensagens.
- **Property Binding `[ ]`:** classes de risco, `disabled` dos botões e valores dos `option`.
- **Event Binding `( )`:** `(click)` para excluir e `(ngSubmit)` para cadastrar.
- **Two-way Data Binding `[(ngModel)]`:** todos os campos do formulário de nova entrega.
- **`*ngIf`:** estados de carregamento, erro, lista vazia, sucesso e validação.
- **`*ngFor`:** entregas recentes, tabela e opções dos selects.
- **`HttpClient`:** operações HTTP centralizadas em `EntregaService`.
- **Angular Router:** navegação entre dashboard, entregas e administração.
