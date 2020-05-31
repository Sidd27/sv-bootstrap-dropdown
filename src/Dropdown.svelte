<script>
  import { onMount, onDestroy, tick } from "svelte";
  import { createPopper } from "@popperjs/core";

  const noop = () => {};

  export let open = false;
  export let flip = true;
  export let placement = "bottom-start";
  export let displayStatic = false;
  export let keyboard = true;
  export let insideClick = false;
  export let closeOnOutsideClick = true;
  export let offset = [0, 2];
  export let menuClasses = "";
  export let classes = "";
  export let triggerElement;
  export let onOpened = noop;
  export let onClosed = noop;
  export let labelledby = "";

  let _menuItem;
  let _popperInstance;
  let _dropdownClass;
  let _keyboardEvent;
  let _outsideClickEvent;
  let _triggerEvent;
  let _items = [];

  const ESCAPE_KEY = "Escape";
  const ARROW_UP_KEY = "ArrowUp";
  const ARROW_DOWN_KEY = "ArrowDown";
  const REGEXP_KEYDOWN = new RegExp(
    `${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`
  );
  const SELECTOR_VISIBLE_ITEMS = ".dropdown-item:not(.disabled):not(:disabled)";

  const placementClassMap = {
    top: "dropup",
    bottom: "dropdown",
    right: "dropright",
    left: "dropleft"
  };

  $: {
    if (open) {
      onDropdownOpend();
    } else {
      onDropdownClosed();
    }
  }

  $: {
    _dropdownClass = placementClassMap[placement.split("-")[0]];
  }

  function attachEvent(target, ...args) {
    target.addEventListener(...args);
    return {
      remove: () => target.removeEventListener(...args)
    };
  }

  function menuClick() {
    if (!insideClick) {
      open = false;
    }
  }

  async function _createPopperInstance() {
    await tick();
    _popperInstance = createPopper(triggerElement, _menuItem, {
      placement,
      modifiers: [
        {
          name: "flip",
          enabled: flip
        },
        {
          name: "offset",
          options: {
            offset
          }
        },
        {
          name: "preventOverflow",
          options: {
            altBoundary: true
          }
        }
      ]
    });
  }

  function _isVisible(element) {
    if (!element) {
      return false;
    }

    if (element.style && element.parentNode && element.parentNode.style) {
      const elementStyle = getComputedStyle(element);
      const parentNodeStyle = getComputedStyle(element.parentNode);

      return (
        elementStyle.display !== "none" &&
        parentNodeStyle.display !== "none" &&
        elementStyle.visibility !== "hidden"
      );
    }

    return false;
  }

  async function getItems() {
    await tick();
    const nodeList = _menuItem.querySelectorAll(SELECTOR_VISIBLE_ITEMS);
    _items = [...nodeList].filter(_isVisible);
  }

  function _keyBoradEvents() {
    if (keyboard) {
      _keyboardEvent = attachEvent(document, "keydown", event => {
        if (
          !/input|textarea/i.test(event.target.tagName) &&
          REGEXP_KEYDOWN.test(event.key)
        ) {
          event.preventDefault();
          event.stopPropagation();
          if (event.key === ESCAPE_KEY) {
            open = false;
          }
          if (!_items.length) {
            return;
          }
          let index = _items.indexOf(event.target);
          if (event.key === ARROW_UP_KEY && index > 0) {
            // Up
            index--;
          }
          if (event.key === ARROW_DOWN_KEY && index < _items.length - 1) {
            // Down
            index++;
          }
          // index is -1 if the first keydown is an ArrowUp
          index = index === -1 ? 0 : index;
          _items[index].focus();
        }
      });
    }
  }

  function _outsideEventAttacher() {
    if (closeOnOutsideClick) {
      _outsideClickEvent = attachEvent(document, "click", event => {
        if (event.target !== _menuItem && !_menuItem.contains(event.target)) {
          open = false;
        }
      });
    }
  }

  async function onDropdownOpend() {
    getItems();
    _keyBoradEvents();
    _outsideEventAttacher();
    if (!displayStatic) {
      _createPopperInstance();
    }
    onOpened();
  }

  function _commonExit() {
    if (_keyboardEvent) {
      _keyboardEvent.remove();
    }
    if (_outsideClickEvent) {
      _outsideClickEvent.remove();
    }
    _destroyPopperInstance();
  }

  function onDropdownClosed() {
    _commonExit();
    onClosed();
  }

  function _destroyPopperInstance() {
    if (_popperInstance) {
      _popperInstance.destroy();
      _popperInstance = null;
    }
  }

  onMount(async () => {
    await tick();
    _triggerEvent = attachEvent(triggerElement, "click", event => {
      event.stopPropagation();
      open = !open;
    });
  });

  onDestroy(() => {
    _commonExit();
    _triggerEvent.remove();
  });
</script>

<div class="{_dropdownClass} {classes}" class:show={open}>
  <slot />
  {#if open}
    <div
      class="dropdown-menu show {menuClasses}"
      bind:this={_menuItem}
      on:click={menuClick}
      aria-labelledby={labelledby}>
      <slot name="DropdownMenu" />
    </div>
  {/if}
</div>
