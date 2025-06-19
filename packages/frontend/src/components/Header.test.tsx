import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

function createMatchMedia(width: number) {
  return (query: string) => {
    return {
      matches: mediaQueryMatches(query, width),
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };
}

function mediaQueryMatches(query: string, width: number): boolean {
  const maxMatch = query.match(/\(max-width:\s*(\d+(\.\d+)?)px\)/);
  const minMatch = query.match(/\(min-width:\s*(\d+(\.\d+)?)px\)/);
  const max = maxMatch ? parseFloat(maxMatch[1]) : Infinity;
  const min = minMatch ? parseFloat(minMatch[1]) : 0;
  return width >= min && width <= max;
}

describe('screen size md', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn(createMatchMedia(1024));
  });

  test('renders heading', () => {
    const menuOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent('QRContact');
  });

  test('renders tabs', () => {
    const menuOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent(
      'Create a QR code from your contact information'
    );
    expect(tabs[1]).toHaveTextContent(
      'Create a contact page and link to it with a QR code'
    );
  });

  test('tab 0 is selected, when menuOption is 0', () => {
    const menuOption = 0;
    const otherOption = 1;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[menuOption]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[otherOption]).toHaveAttribute('aria-selected', 'false');
  });

  test('tab 1 is selected, when menuOption is 1', () => {
    const menuOption = 1;
    const otherOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[menuOption]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[otherOption]).toHaveAttribute('aria-selected', 'false');
  });
});

describe('screen size sm', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn(createMatchMedia(375));
  });

  test('renders heading', () => {
    const menuOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent('QRContact');
  });

  test('renders menu button', async () => {
    const menuOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const menuButton = screen.getByLabelText('menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toBeVisible();
    expect(menuButton).toHaveRole('button');
  });

  test('renders menu items', async () => {
    const menuOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    const buttonStatic = await screen.findByTestId('menu-button-static');
    const buttonDynamic = await screen.findByTestId('menu-button-dynamic');
    expect(buttonStatic).toBeInTheDocument();
    expect(buttonDynamic).toBeInTheDocument();
    expect(buttonStatic).toBeVisible();
    expect(buttonDynamic).toBeVisible();
    expect(buttonStatic).toHaveRole('button');
    expect(buttonDynamic).toHaveRole('button');
  });

  test('setMenuOption() gets called with 0 when menu-button-static is clicked', async () => {
    const menuOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    const buttonStatic = await screen.findByTestId('menu-button-static');
    fireEvent.click(buttonStatic);

    expect(setMenuOption).toHaveBeenCalledWith(0);
  });

  test('setMenuOption() gets called with 1 when menu-button-dynamic is clicked', async () => {
    const menuOption = 0;
    const setMenuOption = vitest.fn();
    render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    const buttonDynamic = await screen.findByTestId('menu-button-dynamic');
    fireEvent.click(buttonDynamic);

    expect(setMenuOption).toHaveBeenCalledWith(1);
  });
});
