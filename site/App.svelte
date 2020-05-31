<script>
  import Dropdown from "../src/Dropdown.svelte";
  let dropdownTrigger;
  let dropdownSplitTrigger;
  let dropdownPlacementTrigger;
  let dropdownReponsiveTrigger;
  let dropdownOffsetTrigger;
</script>

<main style="padding-left:300px;">
  <h3>Single button</h3>
  <Dropdown triggerElement={dropdownTrigger}>
    <button
      type="button"
      class="btn btn-secondary dropdown-toggle"
      bind:this={dropdownTrigger}>
      Dropdown
    </button>
    <div slot="DropdownMenu">
      <a class="dropdown-item" href="javascript:void(0)">Action</a>
      <a class="dropdown-item" href="javascript:void(0)">Another action</a>
      <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
    </div>
  </Dropdown>

  <h3>Split button</h3>
  <Dropdown triggerElement={dropdownSplitTrigger} classes="btn-group">
    <button type="button" class="btn btn-danger">Danger</button>
    <button
      type="button"
      class="btn btn-danger dropdown-toggle dropdown-toggle-split"
      aria-haspopup="true"
      aria-expanded="false"
      bind:this={dropdownSplitTrigger}>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <div slot="DropdownMenu">
      <a class="dropdown-item" href="javascript:void(0)">Action</a>
      <a class="dropdown-item" href="javascript:void(0)">Another action</a>
      <div class="dropdown-divider" />
      <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
    </div>
  </Dropdown>

  <h3>Placement</h3>
  <Dropdown placement="top-end" triggerElement={dropdownPlacementTrigger}>
    <button
      type="button"
      class="btn btn-primary dropdown-toggle"
      bind:this={dropdownPlacementTrigger}>
      Dropdown
    </button>
    <div slot="DropdownMenu">
      <a class="dropdown-item" href="javascript:void(0)">Action</a>
      <a class="dropdown-item" href="javascript:void(0)">Another action</a>
      <div class="dropdown-divider" />
      <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
    </div>
  </Dropdown>

  <h3>Responsive alignment</h3>
  <Dropdown
    triggerElement={dropdownReponsiveTrigger}
    displayStatic="true"
    menuClasses="dropdown-menu-lg-right"
    classes="btn-group">
    <button
      type="button"
      class="btn btn-secondary dropdown-toggle"
      bind:this={dropdownReponsiveTrigger}>
      Left-aligned but right aligned when large screen
    </button>
    <div slot="DropdownMenu">
      <button class="dropdown-item" type="button">Action</button>
      <button class="dropdown-item" type="button">Another action</button>
      <button class="dropdown-item" type="button">Something else here</button>
    </div>
  </Dropdown>

  <h3>Offset</h3>
  <Dropdown offset={[10, 20]} triggerElement={dropdownOffsetTrigger}>
    <button
      type="button"
      class="btn btn-success dropdown-toggle"
      bind:this={dropdownOffsetTrigger}>
      Dropdown
    </button>
    <div slot="DropdownMenu">
      <a class="dropdown-item" href="javascript:void(0)">Action</a>
      <a class="dropdown-item" href="javascript:void(0)">Another action</a>
      <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
    </div>
  </Dropdown>
</main>
