import { render, screen } from '@testing-library/react';
import ContactQRCreator from './index.tsx';
import { createStore } from '../../store';

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

const useStore = createStore();

test('renders heading', () => {
  render(<ContactQRCreator useStore={useStore} />);

  const element = screen.getAllByText('Create a VCard QR-code');
  expect(element).toBeDefined();
});
