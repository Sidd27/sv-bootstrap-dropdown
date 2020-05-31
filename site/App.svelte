<script>
  import Dropdown from "../src/Dropdown.svelte";
  export let name;
  export let isOpen = false;

  let dropdownTrigger;
</script>

<main style="padding-left:300px;">
  <h1>Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <Dropdown
    bind:open={isOpen}
    placement="top-end"
    triggerElement={dropdownTrigger}
    classes="d-inline-block">
    <button
      type="button"
      class="btn btn-secondary"
      bind:this={dropdownTrigger}
      on:click={() => {
        isOpen = !isOpen;
      }}>
      Dropright
    </button>
    <div slot="DropdownMenu">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </Dropdown>
</main>
