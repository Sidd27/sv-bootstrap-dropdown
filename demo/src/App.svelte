<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Dropdown from 'sv-bootstrap-dropdown';

  let trigger1 = $state(null);
  let trigger2 = $state(null);
  let trigger3 = $state(null);
  let trigger4 = $state(null);
  let trigger5 = $state(null);
  let trigger6 = $state(null);
  let manualTrigger = $state(null);
  let manualOpen = $state(false);
</script>

<div class="container py-5">
  <div class="mb-5">
    <h1 class="mb-1">sv-bootstrap-dropdown</h1>
    <p class="text-muted">Bootstrap 5 dropdown component for Svelte 5</p>
  </div>

  <div class="row g-4">
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Single button</h5>
          <p class="card-text text-muted">
            Basic dropdown with a single toggle button.
          </p>
          <Dropdown triggerElement={trigger1}>
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              bind:this={trigger1}
            >
              Dropdown
            </button>
            {#snippet dropdownMenu()}
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            {/snippet}
          </Dropdown>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Split button</h5>
          <p class="card-text text-muted">
            Use <code>classes="btn-group"</code> for split button dropdowns.
          </p>
          <Dropdown triggerElement={trigger2} classes="btn-group">
            <button type="button" class="btn btn-danger">Danger</button>
            <button
              type="button"
              class="btn btn-danger dropdown-toggle dropdown-toggle-split"
              aria-haspopup="true"
              aria-expanded="false"
              bind:this={trigger2}
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
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Placement</h5>
          <p class="card-text text-muted">
            Control direction with the <code>placement</code> prop.
          </p>
          <div class="d-flex gap-2 flex-wrap">
            <Dropdown triggerElement={trigger3} placement="top-start">
              <button
                type="button"
                class="btn btn-outline-secondary dropdown-toggle"
                bind:this={trigger3}
              >
                Dropup
              </button>
              {#snippet dropdownMenu()}
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
              {/snippet}
            </Dropdown>

            <Dropdown triggerElement={trigger4} placement="right-start">
              <button
                type="button"
                class="btn btn-outline-secondary dropdown-toggle"
                bind:this={trigger4}
              >
                Dropend
              </button>
              {#snippet dropdownMenu()}
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
              {/snippet}
            </Dropdown>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Keyboard navigation</h5>
          <p class="card-text text-muted">
            Arrow keys navigate items; Escape closes. Use
            <code>keyboard=&#123;false&#125;</code> to disable.
          </p>
          <Dropdown triggerElement={trigger5}>
            <button
              type="button"
              class="btn btn-outline-secondary dropdown-toggle"
              bind:this={trigger5}
            >
              Open and press ↑ ↓ Esc
            </button>
            {#snippet dropdownMenu()}
              <button class="dropdown-item" type="button">Item one</button>
              <button class="dropdown-item" type="button">Item two</button>
              <button class="dropdown-item disabled" type="button"
                >Disabled</button
              >
              <button class="dropdown-item" type="button">Item three</button>
            {/snippet}
          </Dropdown>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Stay open on inside click</h5>
          <p class="card-text text-muted">
            Pass <code>insideClick=&#123;true&#125;</code> to keep the dropdown open
            when clicking inside.
          </p>
          <Dropdown triggerElement={trigger6} insideClick={true}>
            <button
              type="button"
              class="btn btn-outline-secondary dropdown-toggle"
              bind:this={trigger6}
            >
              Inside click allowed
            </button>
            {#snippet dropdownMenu()}
              <div class="px-3 py-2">
                <label class="form-label">Name</label>
                <input
                  class="form-control form-control-sm"
                  placeholder="Type here..."
                />
              </div>
              <a class="dropdown-item" href="#">Action</a>
            {/snippet}
          </Dropdown>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Manual control</h5>
          <p class="card-text text-muted">
            Use <code>bind:open</code> to control the dropdown programmatically.
          </p>
          <div class="d-flex gap-2 align-items-center">
            <Dropdown triggerElement={manualTrigger} bind:open={manualOpen}>
              <span
                class="badge bg-primary fs-6 px-3 py-2"
                bind:this={manualTrigger}
                style="cursor:pointer"
              >
                Target
              </span>
              {#snippet dropdownMenu()}
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
              {/snippet}
            </Dropdown>
            <button
              class="btn btn-sm btn-outline-primary"
              onclick={() => (manualOpen = !manualOpen)}
            >
              {manualOpen ? 'Hide' : 'Show'} dropdown
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
