# deno-lume-preact-example

Simple example of using [Lume](https://lume.land/) with [Preact](https://preactjs.com/) SSR & hydration with [ESBuild](https://esbuild.github.io/).

## Overview
- Based on [react-todo](https://github.com/lumeland/react-todo) from [lumeland](https://github.com/lumeland)
- Using [minireset.css](https://jgthms.com/minireset.css/)

### main branch

- JSX is defined using JSX pragma, `import { h } from 'preact'` is required in every file

### jsx-auto-import branch

- [jsx-auto-import branch](https://github.com/jrson83/deno-lume-preact-example/tree/jsx-auto-import)
- Using [ESBuild's inject feature](https://esbuild.github.io/content-types/#auto-import-for-jsx) to automatically import `h` & `fragment` into every file

### Configuring JSX in Deno

The [deno documentation](https://deno.land/manual/jsx_dom/jsx) describes multiple ways to configure JSX.

#### Runtime

It is recommended to define `jsx-runtime` in an import map (`import_map.json`), to target pragma `preact` in the `compilerOptions`.

```js
// import_map.json
{
  "imports": {
    "preact/jsx-runtime": "https://esm.sh/preact@10.9.0/jsx-runtime",
    "preact/jsx-dev-runtime": "https://esm.sh/preact@10.9.0/jsx-dev-runtime"
  }
}

// deno.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

If you do not use the `import_map.json` feature, you have to set `"jsxImportSource": "https://esm.sh/preact"`.

#### IDE

If you do not use [denoland.vscode-deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno), you must pass `--import-map import_map.json` & `--config deno.json` as command line option, or configure `.vscode/settings.json`:

```json
{
  "deno.config": "./deno.json",
  "deno.importMap": "./import_map.json"
}
```

### Configuring JSX auto-import in lume

If you followed the above steps, you will still face one problem, when transpiling with esbuild.

> React is not defined

There are multiple open issues on [deno #13288](https://github.com/denoland/deno/issues/13288) and also [ESBuild #334](https://github.com/evanw/esbuild/issues/334) regarding JSX auto-import support.

One way I found out how to enable auto-import in lume:

We create `preact-shim.ts`:

```js
// preact-shim.ts
import { h, Fragment } from "preact";
export { h, Fragment }
```

We do not `import * as preact from "preact";` because we need to reference `h` & `fragment` in `esbuild.options`. (`preact.h` or `preact.fragment` would not be nice.)

Then we add the following `esbuild.options` in `_config.ts`:

```js
// _config.ts
options: {
  jsxFactory: "h",
  jsxFragment: "Fragment",
  inject: ["./preact-shim.ts"],
}
```

The important thing here, is not mentioned in the deno docs, since they do not reference to ESBuild:

> You must set `jsxFactory` & `jsxFragment` here.

If you do not, `ESBuild` will still try to reference `React.createElement` & `React.Fragment`.

If you set `jsxFactory` & `jsxFragment` in `deno.json` `compilerOptions`, ESBuild will not recognize it.

## Conclusion

If everything done correct, you do not need to import `h` or use `pragma` inside your `.jsx` & `.tsx` files, which is great!

Check out the [jsx-auto-import branch](https://github.com/jrson83/deno-lume-preact-example/tree/jsx-auto-import) for a working example.

### More Info

- [Deno: JSX](https://deno.land/manual/jsx_dom/jsx) 
- [ESBuild: Auto-import for JSX](https://esbuild.github.io/content-types/#auto-import-for-jsx)
- [ESBuild: Using JSX without React](https://esbuild.github.io/content-types/#using-jsx-without-react)
- [ESBuild: Inject](https://esbuild.github.io/api/#inject)
- [Preact: Getting your code ready](https://preactjs.com/guide/v10/upgrade-guide/)
