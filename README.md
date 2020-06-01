# sv-bootstrap-dropdown (Svelte Bootstrap Dropdown)
Svelte Dropdown Component for Bootstrap (Bootstrap’s dropdown plugin in svlete applications), can be used with sapper or standalone with svelte.Just like Vainilla bootstrap this plugin too is built on a third party library, [Popper.js](https://popper.js.org/), which provides dynamic positioning and viewport detection. But Unlike Vainilla bootstrap we are using PopperJs V2 instead of v1

## How to install
1. ```npm install --save-dev sv-bootstrap-dropdown @rollup/plugin-replace```
2. Add below code in your rollup config

```js
import replace from '@rollup/plugin-replace';
..
..
..
plugins: [
  ..., // Other Plugins
  ..., // Other Plugins
replace({
	  'process.env.NODE_ENV': JSON.stringify('production'),
	   include: '**/node_modules/**',
    })
]
```

### Requirements
Bootstrap CSS needs to be present globally in project

## Simple Demo
[Demo](https://svelte.dev/repl/f9b0e2f4193b4260b6b16bc097fa0155?version=3.23.0)
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

> The `flip` option will take effect if there is no space for dropdown on the side mentioned in placement.

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

|Placement|Description|
|--- |--- |
|auto|Placements will choose the side with most space and it will be in the center of trigger element|
|auto-start|Placements will choose the side with most space and it will be in the start of trigger element|
|auto-end|Placements will choose the side with most space and it will be in the end of trigger element|
|top|Placements will be upside (dropup) and it will be in the center of trigger element|
|top-start|Placements will be upside (dropup) and it will be in the start of trigger element|
|top-end|Placements will be upside (dropup) and it will be in the end of trigger element|
|bottom|Placements will be downside (dropdown) and it will be in the center of trigger element|
|bottom-start|Placements will be downside (dropdown) and it will be in the start of trigger element|
|bottom-end|Placements will be downside (dropdown) and it will be in the end of trigger element|
|right|Placements will be rightside (dropright) and it will be in the center of trigger element|
|right-start|Placements will be rightside (dropright) and it will be in the start of trigger element|
|right-end|Placements will be rightside (dropright) and it will be in the end of trigger element|
|left|Placements will be leftside (dropleft) and it will be in the center of trigger element|
|left-start|Placements will be leftside (dropleft) and it will be in the start of trigger element|
|left-end|Placements will be leftside (dropleft) and it will be in the end of trigger element|

### Responsive alignment
If you want to use responsive alignment, disable dynamic positioning by using the `displayStatic="true"` attribute and use the responsive variation classes on option `menuClasses` in Dropdown component

---
**NOTE**

> The containing element is div and `.dropdown` is the default class on the `Dropdown` component. As it's a block-level element so width will be 100% to change use `classes` options add `.d-inline-block` or `.btn-group` so that the menu will adjust properly.

---

### Example

``` html
<script>
  import Dropdown from "sv-bootstrap-dropdown";
  let dropdownReponsiveTrigger;
</script>

<Dropdown
    triggerElement={dropdownReponsiveTrigger}
    displayStatic="true"
    menuClasses="dropdown-menu-lg-right"
    classes="d-inline-flex">
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
```

### Offset option
The offset modifier lets you displace menu element from its parent dropdown element. This option takes an array of length 2 both item of array should be Number

`Ex: [10,8]`

* First array Element represent `Skidding`
* Seconf array Element represent `Distance`

#### Example

```html
<script>
  import Dropdown from "sv-bootstrap-dropdown";
  let dropdownOffsetTrigger;
</script>

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
```

---
[PopperJS Documentation](https://popper.js.org/docs/v2/migration-guide/#4-remove-all-css-margins)

In Popper 2 we no longer consider CSS margin because of inherent issues with it. Instead, to apply some padding between the popper and its reference element, use the offset modifier. 

---
Therefore we have default distance offset as 2 to have exact distance as Vanilla Bootstrap

### Component Options

|Name|Type|Default|Description|
|--- |--- |--- |--- |
|open|boolean|false|You can use this to open the dropdown programtically from function.(*Note: setting open to true on load may lead to bug of placement in popper u can use it with displayStatic option*).|
|flip|boolean|true|Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to [Popper.js](https://popper.js.org/docs/v2/modifiers/flip/).|
|placement|string|'bottom-start'|Use `placement` option on `Dropdown` component for placement change.|
|displayStatic|boolean|false|By default, we use Popper.js for dynamic positioning. Disable this with displayStatic.|
|keyboard|boolean|true|Closes the dropdown when escape key is pressed.|
|insideClick|boolean|false|By default, a dropdown menu closes on document click, even if you clicked on an element inside the dropdown. Use `insideClick="true"` to allow click inside the dropdown.|
|closeOnOutsideClick|boolean|true|By default, a dropdown menu closes on document click. Use `closeOnOutsideClick="false"` to disable closing of dropdown on outside click.|
|offset|[?number, ?number] or Function([Definition](https://popper.js.org/docs/v2/modifiers/offset/#options))|[0,2]|The offset modifier lets you displace menu element from its parent dropdown element.|
|menuClasses|string|""|You can add any number of classes to `.dropdown-menu` element.|
|classes|string|""|You can add any number of classes to `.dropdown` element.|
|labelledby|string|""|Used for aria-labelledby on `.dropdown-menu`|
|onClosed|function|Empty function(noop)|Can be Used for callbacks After Dropdown is Closed|
|onOpened|function|Empty function(noop)|Can be Used for callbacks After Dropdown is Opened|

### License
[Apache-2.0](https://github.com/Sidd27/sv-bootstrap-dropdown/blob/master/LICENSE)
