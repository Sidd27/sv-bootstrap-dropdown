# sv-bootstrap-dropdown

Bootstrap 5 dropdown component for Svelte 5. Built on [Popper.js v2](https://popper.js.org/) for dynamic positioning.

## Install

```bash
npm install sv-bootstrap-dropdown
```

Bootstrap CSS must be present globally in your project.

## Usage

### Single button

```svelte
<script>
  import Dropdown from 'sv-bootstrap-dropdown';
  let triggerEl = $state(null);
</script>

<Dropdown triggerElement={triggerEl}>
  <button
    type="button"
    class="btn btn-secondary dropdown-toggle"
    bind:this={triggerEl}
  >
    Dropdown
  </button>
  {#snippet dropdownMenu()}
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  {/snippet}
</Dropdown>
```

### Split button

```svelte
<script>
  import Dropdown from 'sv-bootstrap-dropdown';
  let splitTrigger = $state(null);
</script>

<Dropdown triggerElement={splitTrigger} classes="btn-group">
  <button type="button" class="btn btn-danger">Danger</button>
  <button
    type="button"
    class="btn btn-danger dropdown-toggle dropdown-toggle-split"
    bind:this={splitTrigger}
  >
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  {#snippet dropdownMenu()}
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <hr class="dropdown-divider" />
    <a class="dropdown-item" href="#">Something else here</a>
  {/snippet}
</Dropdown>
```

### Placement

```svelte
<Dropdown placement="top-end" triggerElement={triggerEl}>...</Dropdown>
```

### Manual control

Use `bind:open` to control the dropdown programmatically.

```svelte
<script>
  let open = $state(false);
  let triggerEl = $state(null);
</script>

<Dropdown triggerElement={triggerEl} bind:open>
  <span bind:this={triggerEl}>Target</span>
  {#snippet dropdownMenu()}
    <a class="dropdown-item" href="#">Action</a>
  {/snippet}
</Dropdown>
<button onclick={() => (open = !open)}>Toggle</button>
```

## Migrating from Svelte 3

The named `slot="DropdownMenu"` is replaced by a `{#snippet dropdownMenu()}` prop:

```svelte
<!-- Svelte 3 (old) -->
<div slot="DropdownMenu">
  <a class="dropdown-item" href="#">Item</a>
</div>

<!-- Svelte 5 (new) -->
{#snippet dropdownMenu()}
  <a class="dropdown-item" href="#">Item</a>
{/snippet}
```

Bootstrap 5 also renames `dropright`→`dropend` and `dropleft`→`dropstart`, which the component handles automatically.

## Props

| Name                  | Type               | Default          | Description                                                                                       |
| --------------------- | ------------------ | ---------------- | ------------------------------------------------------------------------------------------------- |
| `open`                | `boolean`          | `false`          | Controls visibility. Supports `bind:open`.                                                        |
| `triggerElement`      | `HTMLElement`      | `null`           | Popper anchor element (also the click toggle when `autoToggle` is true).                          |
| `autoToggle`          | `boolean`          | `true`           | Attach click-toggle to `triggerElement`. Set to `false` for fully manual control via `bind:open`. |
| `flip`                | `boolean`          | `true`           | Allow Popper to flip when there is not enough space.                                              |
| `placement`           | `string`           | `'bottom-start'` | Popper placement. Accepts any Popper placement string.                                            |
| `displayStatic`       | `boolean`          | `false`          | Disable dynamic Popper positioning.                                                               |
| `keyboard`            | `boolean`          | `true`           | Close on Escape; navigate with Arrow keys.                                                        |
| `insideClick`         | `boolean`          | `false`          | Keep open when clicking inside the menu.                                                          |
| `closeOnOutsideClick` | `boolean`          | `true`           | Close when clicking outside.                                                                      |
| `offset`              | `[number, number]` | `[0, 2]`         | `[skidding, distance]` offset from the trigger.                                                   |
| `menuClasses`         | `string`           | `''`             | Extra classes for `.dropdown-menu`.                                                               |
| `classes`             | `string`           | `''`             | Extra classes for the wrapper element.                                                            |
| `labelledby`          | `string`           | `''`             | `aria-labelledby` for `.dropdown-menu`.                                                           |
| `onOpened`            | `() => void`       | `() => {}`       | Callback when the dropdown opens.                                                                 |
| `onClosed`            | `() => void`       | `() => {}`       | Callback when the dropdown closes.                                                                |
| `children`            | `Snippet`          | —                | Default slot (typically the trigger button).                                                      |
| `dropdownMenu`        | `Snippet`          | —                | Menu items snippet.                                                                               |

## License

[Apache-2.0](https://github.com/Sidd27/sv-bootstrap-dropdown/blob/master/LICENSE)
