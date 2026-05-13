import type { Component, Snippet } from 'svelte';

export interface DropdownProps {
  /** Controls dropdown visibility. Supports bind:open. */
  open?: boolean;
  /** The DOM element that triggers the dropdown (also used as Popper anchor). */
  triggerElement?: HTMLElement | null;
  /** Attach a click-toggle handler to triggerElement automatically. Set to false for fully manual control via bind:open. Default: true. */
  autoToggle?: boolean;
  /** Allow Popper to flip placement when there is not enough space. Default: true. */
  flip?: boolean;
  /** Preferred placement relative to the trigger element. Default: 'bottom-start'. */
  placement?:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  /** Disable dynamic Popper positioning. Default: false. */
  displayStatic?: boolean;
  /** Close dropdown on Escape key. Default: true. */
  keyboard?: boolean;
  /** Keep dropdown open when clicking inside the menu. Default: false. */
  insideClick?: boolean;
  /** Close dropdown when clicking outside. Default: true. */
  closeOnOutsideClick?: boolean;
  /** [skidding, distance] offset from the trigger. Default: [0, 2]. */
  offset?: [number, number];
  /** Extra CSS classes for .dropdown-menu. Default: ''. */
  menuClasses?: string;
  /** Extra CSS classes for the wrapper element. Default: ''. */
  classes?: string;
  /** aria-labelledby value for .dropdown-menu. Default: ''. */
  labelledby?: string;
  /** Called when the dropdown opens. */
  onOpened?: () => void;
  /** Called when the dropdown closes. */
  onClosed?: () => void;
  /** Default slot content (typically the trigger button). */
  children?: Snippet;
  /** Snippet for the dropdown menu items. */
  dropdownMenu?: Snippet;
}

declare const Dropdown: Component<DropdownProps, {}, 'open'>;
export default Dropdown;
