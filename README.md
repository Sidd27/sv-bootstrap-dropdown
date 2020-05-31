# sv-bootstrap-dropdown
Svelte Dropdown Component for Bootstrap (Bootstrap’s dropdown plugin in svlete applications), can be used with sapper or standalone with svelte.Just like Vainilla bootstrap this plugin too is built on a third party library, [Popper.js](https://popper.js.org/), which provides dynamic positioning and viewport detection. But Unlike Vainilla bootstrap we are using PopperJs V2 instead of v1

## How to install
```npm install --save-dev sv-bootstrap-dropdown```

### Requirements
Bootstrap CSS needs to be present globally in project



## Usage

### Single button

#### Example
```html
<script>
    import Dropdown from "sv-bootstrap-dropdown";
    let dropdownTrigger;
</script>

<Dropdown triggerElement={dropdownTrigger}>
<button
    type="button"
    class="btn btn-secondary"
    bind:this={dropdownTrigger}
    >
    Dropdown
</button>
<div slot="DropdownMenu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
</div>
</Dropdown>
```
### Split button
Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of .dropdown-toggle-split for proper spacing around the dropdown caret. Just make triggerElement as splited caret button of btn-group and class `.btn-group` via classes option on Dropdown component
#### Example
```html
<script>
    import Dropdown from "sv-bootstrap-dropdown";
    let dropdownSplitTrigger;
</script>

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
```
### Trigger Sizing
Button dropdowns work with buttons of all sizes, including default and split dropdown buttons as the triggerElement is being handled by the developer they have freedom to add any classes, style etc

|Small|Large|Extra large|
|---|---|---|
|  .btn-sm |  .btn-lg | .btn-xl  |

### Flip
This option should tell the `Dropdown` to filp side if there is no space on the prefered side

### Example
```html
<script>
    import Dropdown from "sv-bootstrap-dropdown";
    let triggerEle;
</script>

 <Dropdown flip="false" triggerElement={triggerEle}>
     ...
 </Dropdown>
```

### Directions
Use `placement` option on `Dropdown` component for placement change

---
**NOTE**

The `flip` option will take effect there is no space for dropdown on the side mentioned in placement.

---
#### Example
```html
<script>
    import Dropdown from "sv-bootstrap-dropdown";
    let dropdownPlacementTrigger;
</script>

 <Dropdown placement="top-end" triggerElement={dropdownPlacementTrigger}>
    <button
      type="button"
      class="btn btn-primary"
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
```
#### Complete Placement Options
You can use more options than Vanilla Bootstrap by using placement option
<table>
    <thead>
        <tr>
            <th>Placement</th>
            <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td><code>auto</code></td>
        <td>Placements will choose the side with most space and it will be in the center of trigger element</td>
    </tr>
    <tr>
        <td><code>auto-start</code></td>
        <td>Placements will choose the side with most space and it will be in the start of trigger element</td>
    </tr>
    <tr>
        <td><code>auto-end</code></td>
        <td>Placements will choose the side with most space and it will be in the end of trigger element</td>
    </tr>
    <tr>
        <td><code>top</code></td>
        <td>Placements will be upside (dropup) and it will be in the center of trigger element</td>
    </tr>
    <tr>
        <td><code>top-start</code></td>
        <td>Placements will be upside (dropup) and it will be in the start of trigger element</td>
    </tr>
    <tr>
        <td><code>top-end</code></td>
        <td>Placements will be upside (dropup) and it will be in the end of trigger element</td>
    </tr>
    <tr>
        <td><code>bottom</code></td>
        <td>Placements will be downside (dropdown) and it will be in the center of trigger element</td>
    </tr>
    <tr>
        <td><code>bottom-start</code></td>
        <td>Placements will be downside (dropdown) and it will be in the start of trigger element</td>
    </tr>
    <tr>
        <td><code>bottom-end</code></td>
        <td>Placements will be downside (dropdown) and it will be in the end of trigger element</td>
    </tr>
    <tr>
        <td><code>right</code></td>
        <td>Placements will be rightside (dropright) and it will be in the center of trigger element</td>
    </tr>
    <tr>
        <td><code>right-start</code></td>
        <td>Placements will be rightside (dropright) and it will be in the start of trigger element</td>
    </tr>
    <tr>
        <td><code>right-end</code></td>
        <td>Placements will be rightside (dropright) and it will be in the end of trigger element</td>
    </tr>
    <tr>
        <td><code>left</code></td>
        <td>Placements will be leftside (dropleft) and it will be in the center of trigger element</td>
    </tr>
    <tr>
        <td><code>left-start</code></td>
        <td>Placements will be leftside (dropleft) and it will be in the start of trigger element</td>
    </tr>
    <tr>
        <td><code>left-end</code></td>
        <td>Placements will be leftside (dropleft) and it will be in the end of trigger element</td>
    </tr>
</table>

### Responsive alignment
If you want to use responsive alignment, disable dynamic positioning by using the `displayStatic="true"` attribute and use the responsive variation classes on option `menuClasses` in Dropdown component

---
**NOTE**

The `flip` option will take effect there is no space for dropdown on the side mentioned in placement.

---

### Example

