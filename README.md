# Alecria Expo PWA

Base inicial do aplicativo Alecria com Expo Router, Expo Web e configuração de Progressive Web App (PWA).

## Requisitos

- Node.js LTS compatível com Expo SDK 54
- npm

## Instalação

```bash
npm install
```

## Executar no navegador

```bash
npm run web
```

O servidor de desenvolvimento do Expo disponibiliza a aplicação web localmente.

## Gerar build web estático

```bash
npm run build:web
```

A exportação estática é gerada no diretório `dist/`. Publique o conteúdo desse diretório em uma hospedagem que sirva arquivos estáticos e configure HTTPS para habilitar a instalação PWA e o service worker em produção.

## Recursos PWA incluídos

- `public/manifest.json`: nome, cores, modo standalone e ícone da aplicação.
- `public/register-sw.js`: registra o service worker no navegador.
- `public/sw.js`: cache inicial de recursos estáticos, estratégia network-first para navegação e fallback offline.
- `public/offline.html`: página de contingência quando não há conexão.
- `public/icons/icon.svg` e `public/favicon.svg`: identidade visual provisória.
- `src/app/+html.tsx`: idioma pt-BR, metadados, manifest e registro do service worker.

O service worker não intercepta métodos que não sejam GET, requisições de outra origem ou caminhos de API. Dados dinâmicos e respostas do Firebase/Firestore não devem ser armazenados em cache por esta estratégia.

## Escopo desta etapa

Esta é somente a fundação Expo Web/PWA e uma tela inicial provisória. Formulário de contatos, CRUD e integração Firebase não foram implementados. Eles serão adicionados nas etapas seguintes após os respectivos checkpoints.

## Observações

- Para testar a instalação PWA, use uma build servida por HTTPS (ou localhost durante desenvolvimento) e verifique o painel Application/Manifest do navegador.
- O ícone SVG facilita a adaptação visual; para ampliar compatibilidade com instaladores e lojas, recomenda-se adicionar também ícones PNG de 192×192 e 512×512 em uma etapa de acabamento.
- O comportamento offline foi preparado como base, mas precisa ser validado no navegador após instalar dependências e executar a build.
