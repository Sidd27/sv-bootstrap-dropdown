# sv-bootstrap-dropdown

Bootstrap 5 dropdown component for Svelte 5, published to npm as `sv-bootstrap-dropdown`.

## Commands

```bash
npm run build        # compile to dist/ via Rollup
npm run dev          # watch mode
npm test             # run tests (Vitest + jsdom)
npm run test:watch   # watch mode tests
npm run demo         # start demo dev server (Vite, port 5173)
npm run demo:build   # build demo to demo/dist/
```

## Architecture

- **`src/Dropdown.svelte`** — single component, Svelte 5 runes API (`$props`, `$state`, `$derived`, `$effect`)
- **`src/main.js`** — package entry point, re-exports Dropdown as default and named
- **`src/index.d.ts`** — type re-exports pointing to `Dropdown.svelte.d.ts`
- **`src/Dropdown.svelte.d.ts`** — hand-written TypeScript types for the public API
- **`rollup.config.js`** — builds to `dist/index.mjs` (ESM) and `dist/index.cjs` (CJS); Svelte is external; includes `@rollup/plugin-replace` to patch `process.env.NODE_ENV` in `@popperjs/core`
- **`demo/`** — standalone Vite app for the GitHub Pages demo; not part of the published package
- **`tests/`** — Vitest tests using `@testing-library/svelte` + jsdom; `@popperjs/core` is mocked

## Slot migration (Svelte 3 → 5)

The Svelte 3 API used named slots:

```svelte
<Dropdown triggerElement={el}>
  <button bind:this={el}>Open</button>
  <div slot="DropdownMenu">
    <a class="dropdown-item" href="#">Item</a>
  </div>
</Dropdown>
```

The Svelte 5 API uses snippets:

```svelte
<Dropdown triggerElement={el}>
  <button bind:this={el}>Open</button>
  {#snippet dropdownMenu()}
    <a class="dropdown-item" href="#">Item</a>
  {/snippet}
</Dropdown>
```

## Bootstrap 5 class changes

- `dropright` → `dropend`
- `dropleft` → `dropstart`
- `dropdown-menu-{breakpoint}-right` → `dropdown-menu-{breakpoint}-end`

## Key constraints

- Svelte and Bootstrap are peer dependencies — never bundle them
- `@popperjs/core` is a regular dependency (not peer) since it is not provided by Bootstrap CSS-only installs
- `rollup.config.js` uses `@rollup/plugin-replace` to replace `process.env.NODE_ENV` in node_modules — required because `@popperjs/core` references `process.env.NODE_ENV` and it would throw in a browser bundle without this
- The component uses Svelte 5 runes (`runes: true` in compiler options); do not revert to legacy API
- Node >= 24 required (enforced in `package.json` engines field)

## Publishing

Releases are triggered by pushing a `v*` tag. The GitHub Actions workflow (`.github/workflows/publish.yml`) uses pnpm for install/build, then `npm publish --provenance` for the actual publish step.

```bash
git tag v1.x.x && git push origin v1.x.x
```
