<script>
  import { createPopper } from '@popperjs/core';

  let {
    open = $bindable(false),
    flip = true,
    placement = 'bottom-start',
    displayStatic = false,
    keyboard = true,
    insideClick = false,
    closeOnOutsideClick = true,
    offset = [0, 2],
    menuClasses = '',
    classes = '',
    triggerElement = null,
    onOpened = () => {},
    onClosed = () => {},
    labelledby = '',
    children,
    dropdownMenu,
  } = $props();

  let menuEl = $state(null);

  const ESCAPE_KEY = 'Escape';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const REGEXP_KEYDOWN = new RegExp(
    `${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`
  );
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-item:not(.disabled):not(:disabled)';

  const placementClassMap = {
    top: 'dropup',
    bottom: 'dropdown',
    right: 'dropend',
    left: 'dropstart',
  };

  let dropdownClass = $derived(
    placementClassMap[placement.split('-')[0]] ?? 'dropdown'
  );

  function attachEvent(target, ...args) {
    target.addEventListener(...args);
    return { remove: () => target.removeEventListener(...args) };
  }

  function _isVisible(element) {
    if (!element) return false;
    if (element.style && element.parentNode && element.parentNode.style) {
      const elementStyle = getComputedStyle(element);
      const parentNodeStyle = getComputedStyle(element.parentNode);
      return (
        elementStyle.display !== 'none' &&
        parentNodeStyle.display !== 'none' &&
        elementStyle.visibility !== 'hidden'
      );
    }
    return false;
  }

  $effect(() => {
    if (!triggerElement) return;
    const ev = attachEvent(triggerElement, 'click', (event) => {
      event.stopPropagation();
      open = !open;
    });
    return () => ev.remove();
  });

  $effect(() => {
    if (!menuEl) return;

    const nodeList = menuEl.querySelectorAll(SELECTOR_VISIBLE_ITEMS);
    let items = [...nodeList].filter(_isVisible);

    let popperInstance = null;
    if (!displayStatic && triggerElement) {
      popperInstance = createPopper(triggerElement, menuEl, {
        placement,
        modifiers: [
          { name: 'flip', enabled: flip },
          { name: 'offset', options: { offset } },
          { name: 'preventOverflow', options: { altBoundary: true } },
        ],
      });
    }

    onOpened();

    const events = [];

    if (keyboard) {
      events.push(
        attachEvent(document, 'keydown', (event) => {
          if (
            !/input|textarea/i.test(event.target.tagName) &&
            REGEXP_KEYDOWN.test(event.key)
          ) {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === ESCAPE_KEY) {
              open = false;
              return;
            }
            if (!items.length) return;
            let index = items.indexOf(event.target);
            if (event.key === ARROW_UP_KEY && index > 0) index--;
            if (event.key === ARROW_DOWN_KEY && index < items.length - 1)
              index++;
            index = index === -1 ? 0 : index;
            items[index].focus();
          }
        })
      );
    }

    if (closeOnOutsideClick) {
      events.push(
        attachEvent(document, 'click', (event) => {
          if (event.target !== menuEl && !menuEl.contains(event.target)) {
            open = false;
          }
        })
      );
    }

    return () => {
      events.forEach((e) => e.remove());
      popperInstance?.destroy();
      onClosed();
    };
  });
</script>

<div class="{dropdownClass} {classes}" class:show={open}>
  {@render children?.()}
  {#if open}
    <div
      class="dropdown-menu show {menuClasses}"
      role="menu"
      tabindex="-1"
      bind:this={menuEl}
      onclick={() => !insideClick && (open = false)}
      onkeydown={() => {}}
      aria-labelledby={labelledby}
    >
      {@render dropdownMenu?.()}
    </div>
  {/if}
</div>
