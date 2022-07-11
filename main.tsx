import { hydrate } from "preact";
import App from "./app/app.tsx";

// fix `Non-null assertion operator` https://miyauchi.dev/posts/vite-preact-typescript/
const el = document.getElementById("app");

if (el) {
  hydrate(<App />, el);
}
