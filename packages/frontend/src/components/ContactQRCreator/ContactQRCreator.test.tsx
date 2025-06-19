import { fireEvent, render, screen } from '@testing-library/react';
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
});

describe('ContactQRCreator', () => {
  test('renders heading', () => {
    render(<ContactQRCreator />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeDefined();
    expect(heading).toHaveTextContent('Create a vCard QR code');
  });

  test('renders contact form', () => {
    render(<ContactQRCreator />);

    const form = screen.getByTestId('contact-form');
    expect(form).toBeDefined();
  });

  test('renders qr code display', () => {
    render(<ContactQRCreator />);

    const qrCodeDisplay = screen.getByTestId('qr-code-display');
    expect(qrCodeDisplay).toBeDefined();
  });

  test('renders vCard display after the form has been submitted', async () => {
    render(<ContactQRCreator />);

    const firstNameInput = screen.getByLabelText('First name', {
      exact: false,
    });
    const lastNameInput = screen.getByLabelText('Last name', { exact: false });
    const submitButton = screen.getByRole('button', { name: 'Create' });
    fireEvent.change(firstNameInput, { target: { value: 'Pertti' } });
    fireEvent.change(lastNameInput, { target: { value: 'Mäkynen' } });
    fireEvent.click(submitButton);

    const vCardDisplay = await screen.findByTestId('vcard-display');
    expect(vCardDisplay).toBeDefined();
  });
});
