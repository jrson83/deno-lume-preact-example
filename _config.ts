import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import terser from "lume/plugins/terser.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume({});

site
  .ignore("LICENSE")
  .ignore("README.md")
  .ignore("app")
  .use(esbuild({
    extensions: [".tsx"],
  }))
  .use(terser())
  .use(postcss());

export default site;
