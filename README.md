# Alecria Expo PWA

Aplicação inicial com Expo Router, Expo Web e configuração de Progressive Web App (PWA).

## Requisitos

- Node.js LTS compatível com Expo SDK 54
- npm

## Instalação e execução

```bash
npm install
cp .env.example .env
# Preencha .env com os dados do app Web no Firebase Console
npm run web
```

## Build web estática

```bash
npm run build:web
```

A exportação estática é gerada no diretório `dist/`. Para instalação PWA em produção, publique esse diretório em uma hospedagem com HTTPS.

## Etapa 2 — Base Expo Web/PWA

- Manifest em `public/manifest.json`
- Registro do service worker em `public/register-sw.js`
- Cache inicial de recursos e fallback offline em `public/sw.js` e `public/offline.html`
- Metadados web em `src/app/+html.tsx`
- Ícones provisórios em `public/favicon.svg` e `public/icons/icon.svg`

O service worker não intercepta métodos diferentes de GET, requisições de outra origem ou caminhos de API.

## Etapa 3 — Interface de contatos

- Formulário de nome e e-mail com validação básica.
- Lista de contatos com busca.
- Edição de um contato reutilizando o formulário.
- Exclusão local de registros.
- Layout responsivo para telas estreitas e largas.
- Dados simulados isolados em `src/data/mockContacts.ts`.

**Importante:** a interface ainda usa somente estado em memória. Alterações são perdidas ao recarregar a página; nenhum registro é enviado ou persistido em servidor.

## Etapa 4 — Preparação do Firebase

- SDK modular Firebase instalado em `package.json`.
- Inicialização centralizada em `src/lib/firebase.ts`.
- Configuração por variáveis `EXPO_PUBLIC_FIREBASE_*`, com modelo em `.env.example`.
- Exporta `db`, `firebaseApp`, `isFirebaseConfigured` e o nome da coleção `contatos`.
- A aplicação continua podendo abrir sem configuração Firebase durante o desenvolvimento da interface.

Para usar, copie `.env.example` para `.env` e substitua os valores pelos dados do aplicativo Web em Firebase Console → Project settings → Your apps. Reinicie o servidor Expo depois de editar as variáveis.

**Segurança:** as variáveis `EXPO_PUBLIC_*` ficam acessíveis no bundle do navegador e não devem conter segredos. Não foram adicionadas credenciais reais nem regras abertas do Firestore. Configure as regras do Firestore no Firebase Console antes de usar dados reais; regras de teste abertas não são apropriadas para produção.

A coleção prevista é `contatos`, com os campos `nome`, `email`, `createdAt` e `updatedAt`. O CRUD real ainda não foi implementado nesta etapa.

## Validação PWA

Para testar instalação e funcionamento offline, execute a build e sirva o conteúdo por HTTPS (ou use localhost em desenvolvimento). Confira Manifest e Service Worker no painel Application do navegador. O comportamento de build, integração Firebase e instalação ainda precisa ser verificado em ambiente de execução.
