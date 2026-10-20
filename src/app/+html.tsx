import { Main, Scripts, ScrollViewStyleReset } from "expo-router/html";

export default function Root() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#243b75" />
        <meta name="description" content="Aplicação web progressiva do projeto Alecria." />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
      </head>
      <body>
        <ScrollViewStyleReset />
        <Main />
        <Scripts />
        <script src="/register-sw.js" defer />
      </body>
    </html>
  );
}