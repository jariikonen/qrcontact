import { render, screen } from '@testing-library/react';
import ContactQRCreator from './index.tsx';

// Stub for ResizeObserver
vi.stubGlobal(
  'ResizeObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);

// Stub for URL.createObjectURL
vi.stubGlobal('URL', {
  createObjectURL: vi.fn(),
  revokeObjectURL: vi.fn(),
});

test('renders heading', () => {
  render(<ContactQRCreator />);

  const element = screen.getAllByText('Create a VCard QR-code');
  expect(element).toBeDefined();
});
