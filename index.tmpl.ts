import renderToString from "preact-render-to-string";
import App from "./app/app.tsx";
import { Helper } from "lume/core.ts";

const ssr = renderToString(App());

interface Helpers {
  [key: string]: Helper;
}

export default function (_data: unknown, { url }: Helpers) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lume & Preact example</title>
    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />
    <link rel="stylesheet" href="${url("/styles.css")}">
  </head>
  <body>
    <main id="app">${ssr}</main>
    <script type="module" src="${url("/main.js")}" bundle></script>
  </body>
</html>`;
}
