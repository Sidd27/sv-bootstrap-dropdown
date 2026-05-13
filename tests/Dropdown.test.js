import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import Dropdown from '../src/Dropdown.svelte';

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({ destroy: vi.fn(), update: vi.fn() })),
}));

afterEach(() => {
  cleanup();
});

function makeTrigger() {
  const el = document.createElement('button');
  document.body.appendChild(el);
  return el;
}

describe('rendering', () => {
  it('does not render menu when open is false', () => {
    render(Dropdown, { open: false, triggerElement: makeTrigger() });
    expect(document.querySelector('.dropdown-menu')).not.toBeInTheDocument();
  });

  it('renders menu when open is true', async () => {
    render(Dropdown, { open: true, triggerElement: makeTrigger() });
    await tick();
    expect(document.querySelector('.dropdown-menu')).toBeInTheDocument();
  });

  it('applies show class to wrapper when open', async () => {
    const { container } = render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
    });
    await tick();
    expect(container.firstChild).toHaveClass('show');
  });

  it('does not apply show class to wrapper when closed', () => {
    const { container } = render(Dropdown, {
      open: false,
      triggerElement: makeTrigger(),
    });
    expect(container.firstChild).not.toHaveClass('show');
  });
});

describe('placement classes', () => {
  it('uses dropdown class for bottom placement', async () => {
    const { container } = render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      placement: 'bottom-start',
    });
    await tick();
    expect(container.firstChild).toHaveClass('dropdown');
  });

  it('uses dropup class for top placement', async () => {
    const { container } = render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      placement: 'top-start',
    });
    await tick();
    expect(container.firstChild).toHaveClass('dropup');
  });

  it('uses dropend class for right placement', async () => {
    const { container } = render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      placement: 'right-start',
    });
    await tick();
    expect(container.firstChild).toHaveClass('dropend');
  });

  it('uses dropstart class for left placement', async () => {
    const { container } = render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      placement: 'left-start',
    });
    await tick();
    expect(container.firstChild).toHaveClass('dropstart');
  });
});

describe('trigger click', () => {
  it('opens on trigger click', async () => {
    const el = makeTrigger();
    render(Dropdown, { open: false, triggerElement: el });
    await tick();
    await fireEvent.click(el);
    await tick();
    expect(document.querySelector('.dropdown-menu')).toBeInTheDocument();
  });

  it('closes on second trigger click', async () => {
    const el = makeTrigger();
    render(Dropdown, { open: true, triggerElement: el });
    await tick();
    await fireEvent.click(el);
    await tick();
    expect(document.querySelector('.dropdown-menu')).not.toBeInTheDocument();
  });
});

describe('keyboard', () => {
  it('closes on Escape key', async () => {
    render(Dropdown, { open: true, triggerElement: makeTrigger() });
    await tick();
    await fireEvent.keyDown(document, { key: 'Escape' });
    await tick();
    expect(document.querySelector('.dropdown-menu')).not.toBeInTheDocument();
  });

  it('does not close on Escape when keyboard is false', async () => {
    render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      keyboard: false,
    });
    await tick();
    await fireEvent.keyDown(document, { key: 'Escape' });
    await tick();
    expect(document.querySelector('.dropdown-menu')).toBeInTheDocument();
  });
});

describe('outside click', () => {
  it('closes on outside click', async () => {
    render(Dropdown, { open: true, triggerElement: makeTrigger() });
    await tick();
    await fireEvent.click(document.body);
    await tick();
    expect(document.querySelector('.dropdown-menu')).not.toBeInTheDocument();
  });

  it('does not close on outside click when closeOnOutsideClick is false', async () => {
    render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      closeOnOutsideClick: false,
    });
    await tick();
    await fireEvent.click(document.body);
    await tick();
    expect(document.querySelector('.dropdown-menu')).toBeInTheDocument();
  });
});

describe('insideClick', () => {
  it('closes on menu item click by default', async () => {
    render(Dropdown, { open: true, triggerElement: makeTrigger() });
    await tick();
    const menu = document.querySelector('.dropdown-menu');
    await fireEvent.click(menu);
    await tick();
    expect(document.querySelector('.dropdown-menu')).not.toBeInTheDocument();
  });

  it('stays open on menu click when insideClick is true', async () => {
    render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      insideClick: true,
    });
    await tick();
    const menu = document.querySelector('.dropdown-menu');
    await fireEvent.click(menu);
    await tick();
    expect(document.querySelector('.dropdown-menu')).toBeInTheDocument();
  });
});

describe('callbacks', () => {
  it('calls onOpened when dropdown opens', async () => {
    const onOpened = vi.fn();
    render(Dropdown, { open: true, triggerElement: makeTrigger(), onOpened });
    await tick();
    await vi.waitFor(() => expect(onOpened).toHaveBeenCalledOnce());
  });

  it('calls onClosed when dropdown closes', async () => {
    const onClosed = vi.fn();
    const { rerender } = render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      onClosed,
    });
    await tick();
    await rerender({ open: false });
    await tick();
    expect(onClosed).toHaveBeenCalledOnce();
  });
});

describe('extra classes', () => {
  it('applies menuClasses to dropdown-menu', async () => {
    render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      menuClasses: 'dropdown-menu-end',
    });
    await tick();
    expect(document.querySelector('.dropdown-menu')).toHaveClass(
      'dropdown-menu-end'
    );
  });

  it('applies classes to wrapper element', async () => {
    const { container } = render(Dropdown, {
      open: true,
      triggerElement: makeTrigger(),
      classes: 'btn-group',
    });
    await tick();
    expect(container.firstChild).toHaveClass('btn-group');
  });
});
