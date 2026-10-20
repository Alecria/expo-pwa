# Alecria Expo PWA

Aplicação inicial com Expo Router, Expo Web e configuração de Progressive Web App (PWA).

## Requisitos

- Node.js LTS compatível com Expo SDK 54
- npm

## Instalação e execução

```bash
npm install
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

**Importante:** esta etapa usa somente estado em memória. Alterações são perdidas ao recarregar a página; nenhum registro é enviado ou persistido em servidor. A integração Firebase e a persistência real não fazem parte desta etapa.

## Próximas etapas

A etapa seguinte configurará o Firebase com variáveis de ambiente e estrutura centralizada de inicialização. O CRUD real será conectado apenas na etapa dedicada a essa implementação.

## Validação PWA

Para testar instalação e funcionamento offline, execute a build e sirva o conteúdo por HTTPS (ou use localhost em desenvolvimento). Confira Manifest e Service Worker no painel Application do navegador. O comportamento de build e instalação ainda deve ser verificado em ambiente de execução.