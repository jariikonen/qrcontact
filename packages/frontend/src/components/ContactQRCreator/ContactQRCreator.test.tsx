import { fireEvent, render, screen } from '@testing-library/react';
import ContactQRCreator from './index.tsx';

vi.stubGlobal(
  'ResizeObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(),
});

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('ContactQRCreator', () => {
  it('renders heading', () => {
    render(<ContactQRCreator />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Create a vCard QR code');
  });

  it('renders contact form', () => {
    render(<ContactQRCreator />);

    const form = screen.getByTestId('contact-form');
    expect(form).toBeDefined();
  });

  it('renders qr code display', () => {
    render(<ContactQRCreator />);

    const qrCodeDisplay = screen.getByTestId('qr-code-display');
    expect(qrCodeDisplay).toBeInTheDocument();
  });

  it('renders vCard display after the form has been submitted', async () => {
    render(<ContactQRCreator />);

    const firstNameInput = screen.getByLabelText('First name', {
      exact: false,
    });
    const lastNameInput = screen.getByLabelText('Last name', { exact: false });
    const submitButton = screen.getByRole('button', { name: 'Create' });
    fireEvent.change(firstNameInput, { target: { value: 'Pertti' } });
    fireEvent.change(lastNameInput, { target: { value: 'Mäkynen' } });
    fireEvent.click(submitButton);

    const downloadVCardButton = await screen.findByRole('button', {
      name: 'Download vCard file',
    });
    const editVCardButton = await screen.findByRole('button', {
      name: 'Edit vCard',
    });
    expect(downloadVCardButton).toBeInTheDocument();
    expect(downloadVCardButton).toBeVisible();
    expect(editVCardButton).toBeInTheDocument();
    expect(editVCardButton).toBeVisible();
  });
});
