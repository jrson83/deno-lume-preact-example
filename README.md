# deno-lume-preact-example

Example of using [Lume](https://lume.land/) with [Preact](https://preactjs.com/) SSR & hydration (this is my first deno project).

## Overview
- Based on [react-todo](https://github.com/lumeland/react-todo) from [lumeland](https://github.com/lumeland)
- JSX is defined using JSX pragma, so `import { h } from 'preact'` is required
  - Next step is to get auto imports working
- I couldn't get `preact/hooks` working with [esm.sh](https://esm.sh/), thats why [lcas.dev](https://x.lcas.dev/) is used ([preact issue #2690](https://github.com/preactjs/preact/issues/2690#issuecomment-677913519))