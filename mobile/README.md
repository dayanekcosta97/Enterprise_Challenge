# Smart Logistics 5.0 — Aplicativo Mobile

MVP mobile para consultar entregas, acompanhar risco e ETA, visualizar detalhes e registrar ocorrências integradas à Smart Logistics API em Spring Boot.

## Tecnologia e justificativa

O aplicativo utiliza React Native com Expo SDK 54, TypeScript, componentes funcionais, React Navigation e a API nativa `fetch`.

> A adoção do React Native permite evoluir o Smart Logistics 5.0 para uma experiência mobile multiplataforma, com uma única base de código para Android e iOS, mantendo o aplicativo desacoplado do backend Spring Boot através de APIs REST.

Não foram adicionadas bibliotecas visuais, Redux, mapas, GPS, câmera ou notificações push.

## Telas e navegação

O React Navigation com Native Stack implementa o fluxo:

1. **Home:** apresentação do aplicativo e acesso às entregas.
2. **Entregas:** consulta `GET /api/entregas`, estados de carregamento, erro e lista vazia.
3. **Detalhe da Entrega:** exibe todos os dados da entrega selecionada.
4. **Registrar Ocorrência:** envia `POST /api/ocorrencias` e retorna à lista atualizada.

## Componentes acadêmicos

- `View`: estrutura das telas, cards, formulários e grupos de informações.
- `Text`: títulos, dados operacionais, feedbacks e mensagens de estado.
- `Image`: identidade visual exibida na Home.
- `Button`: navegação, detalhes das entregas e envio de ocorrências.
- Componentes funcionais: todas as telas e componentes reutilizáveis.

## Configuração da API

Crie o arquivo `.env` dentro de `mobile/`, usando `.env.example` como referência:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
```

Use o endereço adequado ao ambiente:

- Emulador Android: `http://10.0.2.2:8080`
- Celular físico com Expo Go: `http://IP_LOCAL_DO_COMPUTADOR:8080`
- Simulador iOS: `http://localhost:8080`

O celular e o computador devem estar na mesma rede. Reinicie o Expo após alterar `.env`.

A autenticação HTTP Basic de demonstração (`admin` / `admin123`) e todas as requisições ficam centralizadas em `src/services/api.ts`. As credenciais fixas são adequadas somente ao MVP acadêmico local e não devem ser usadas assim em produção.

## Como executar

Primeiro, inicie o backend na raiz do repositório:

```bash
cd backend
mvn spring-boot:run
```

Depois, em outro terminal:

```bash
cd mobile
npm install
npm start
```

Com o Metro aberto:

- Pressione `a` para abrir no emulador Android.
- Escaneie o QR Code com o Expo Go para abrir no celular físico.
- Pressione `i` para o simulador iOS, disponível em macOS.

Também é possível iniciar diretamente:

```bash
npm run android
npm run ios
```

## Verificações

```bash
npm run typecheck
npx expo-doctor
npm run export:android
```
