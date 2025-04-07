import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header', () => {
  const menuOption = 0;
  const setMenuOption = vitest.fn();
  render(<Header menuOption={menuOption} setMenuOption={setMenuOption} />);

  const elements = screen.getAllByText('QRContact');
  expect(elements).toBeDefined();
  expect(elements.length).toBe(2);
});
