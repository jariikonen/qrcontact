import { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactQRCreator from './index.tsx';
import { useStore } from '../../store';

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

afterEach(() => {
  // Reset zustand store!
  act(() => {
    useStore.getState().reset();
  });
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

    // Fill in the form and submit it
    const firstNameInput = screen.getByLabelText('First name', {
      exact: false,
    });
    const lastNameInput = screen.getByLabelText('Last name', { exact: false });
    const submitButton = screen.getByRole('button', { name: 'Create' });
    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'Pertti' } });
      fireEvent.change(lastNameInput, { target: { value: 'Mäkynen' } });
      fireEvent.click(submitButton);
    });

    // Check that the vCard display is rendered
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

  it('notifies user that the form data does not match the vCard when form values have been changed after the vCard display was created', async () => {
    render(<ContactQRCreator />);

    // Fill in the form and submit it
    const firstNameInput: HTMLInputElement = screen.getByLabelText(
      'First name',
      {
        exact: false,
      }
    );
    const lastNameInput: HTMLInputElement = screen.getByLabelText('Last name', {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: 'Create' });
    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'Pertti' } });
      fireEvent.change(lastNameInput, { target: { value: 'Mäkynen' } });
      fireEvent.click(submitButton);
    });

    expect(firstNameInput.value).toBe('Pertti');
    expect(lastNameInput.value).toBe('Mäkynen');

    // Change the first name input value and check for the notice
    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'Liisa' } });
    });

    expect(firstNameInput.value).toBe('Liisa');

    const notice = await screen.findByText(/Notice!/i);
    expect(notice).toBeInTheDocument();
    expect(notice).toBeVisible();
  });
});
