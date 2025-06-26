import { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from './index.tsx';
import { phoneNumberTypeOptions } from '../PhoneNumberInput/constants.ts';
import { Store } from '../../store.ts';

vi.stubGlobal(
  'ResizeObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);

const defaultFormValues = {
  firstName: 'Jaana',
  lastName: 'Tikkanen',
  phone: [
    {
      preferred: false,
      type: phoneNumberTypeOptions[0],
      number: '123456789',
    },
  ],
};

const mockFormSelector = vi.fn((_state: Store) => {
  return defaultFormValues;
});

const mockSetFormValues = vi.fn();
const mockHandleSubmit = vi.fn();
const mockHandleReset = vi.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the form', () => {
    render(
      <ContactForm
        formSelector={mockFormSelector}
        setFormValues={mockSetFormValues}
        handleSubmit={mockHandleSubmit}
        handleReset={mockHandleReset}
        submitLabel="Submit"
      />
    );
    const form = screen.getByTestId('contact-form');
    expect(form).toBeInTheDocument();
    expect(form).toBeVisible();
  });

  it('renders all input fields', () => {
    render(
      <ContactForm
        formSelector={mockFormSelector}
        setFormValues={mockSetFormValues}
        handleSubmit={mockHandleSubmit}
        handleReset={mockHandleReset}
        submitLabel="Submit"
      />
    );

    const firstNameInput = screen.getByLabelText('First name *');
    const lastNameInput = screen.getByLabelText('Last name *');
    const phoneNumberInput = screen.getByLabelText('Phone number');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
    expect(firstNameInput).toBeVisible();
    expect(lastNameInput).toBeVisible();
    expect(phoneNumberInput).toBeVisible();
  });

  it('calls store selector to get form values', () => {
    render(
      <ContactForm
        formSelector={mockFormSelector}
        setFormValues={mockSetFormValues}
        handleSubmit={mockHandleSubmit}
        handleReset={mockHandleReset}
        submitLabel="Submit"
      />
    );
    expect(mockFormSelector).toHaveBeenCalled();

    const firstNameInput = screen.getByLabelText('First name *');
    const lastNameInput = screen.getByLabelText('Last name *');
    const phoneNumberInput = screen.getByLabelText('Phone number');

    expect(firstNameInput).toHaveValue('Jaana');
    expect(lastNameInput).toHaveValue('Tikkanen');
    expect(phoneNumberInput).toHaveValue('123456789');
  });

  it('calls setFormValues when form data is changed', async () => {
    render(
      <ContactForm
        formSelector={mockFormSelector}
        setFormValues={mockSetFormValues}
        handleSubmit={mockHandleSubmit}
        handleReset={mockHandleReset}
        submitLabel="Submit"
      />
    );

    const firstNameInput = screen.getByLabelText('First name *');

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'Pertti' } });
    });

    await waitFor(() => {
      expect(mockSetFormValues).toHaveBeenCalledWith({
        firstName: 'Pertti',
        lastName: 'Tikkanen',
        phone: [
          {
            preferred: false,
            type: phoneNumberTypeOptions[0],
            number: '123456789',
          },
        ],
      });
    });
  });

  it('calls handleSubmit when form is submitted', async () => {
    render(
      <ContactForm
        formSelector={mockFormSelector}
        setFormValues={mockSetFormValues}
        handleSubmit={mockHandleSubmit}
        handleReset={mockHandleReset}
        submitLabel="Submit"
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  it('calls handleReset when reset button is clicked', async () => {
    render(
      <ContactForm
        formSelector={mockFormSelector}
        setFormValues={mockSetFormValues}
        handleSubmit={mockHandleSubmit}
        handleReset={mockHandleReset}
        submitLabel="Submit"
      />
    );

    const resetButton = screen.getByRole('button', { name: 'Clear' });

    act(() => {
      fireEvent.click(resetButton);
    });

    await waitFor(() => {
      expect(mockHandleReset).toHaveBeenCalled();
    });
  });

  it('clears the form when reset button is clicked', async () => {
    render(
      <ContactForm
        formSelector={mockFormSelector}
        setFormValues={mockSetFormValues}
        handleSubmit={mockHandleSubmit}
        handleReset={mockHandleReset}
        submitLabel="Submit"
      />
    );

    const resetButton = screen.getByRole('button', { name: 'Clear' });
    const firstNameInput = screen.getByLabelText('First name *');
    const lastNameInput = screen.getByLabelText('Last name *');

    act(() => {
      fireEvent.click(resetButton);
    });

    await waitFor(() => {
      expect(mockHandleReset).toHaveBeenCalled();
      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
    });
  });

  describe('confirmation dialog', () => {
    const mockDialogTitle = 'Confirm reset';
    const mockDialogContent = 'Are you sure you want to reset the form?';
    const mockDoConfirmation = vi.fn(() => true);
    const mockResetConfirmationProps = {
      dialogTitle: mockDialogTitle,
      dialogContent: mockDialogContent,
      doConfirmation: mockDoConfirmation,
    };

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('confirms form reset from user when the doConfirmation returns true', async () => {
      render(
        <ContactForm
          formSelector={mockFormSelector}
          setFormValues={mockSetFormValues}
          handleSubmit={mockHandleSubmit}
          handleReset={mockHandleReset}
          submitLabel="Submit"
          resetConfirmationProps={mockResetConfirmationProps}
        />
      );

      const resetButton = screen.getByRole('button', { name: 'Clear' });

      act(() => {
        fireEvent.click(resetButton);
      });

      await waitFor(() => {
        expect(mockDoConfirmation).toHaveBeenCalled();
      });

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('renders confirmation dialog correctly', async () => {
      render(
        <ContactForm
          formSelector={mockFormSelector}
          setFormValues={mockSetFormValues}
          handleSubmit={mockHandleSubmit}
          handleReset={mockHandleReset}
          submitLabel="Submit"
          resetConfirmationProps={mockResetConfirmationProps}
        />
      );

      const resetButton = screen.getByRole('button', { name: 'Clear' });

      act(() => {
        fireEvent.click(resetButton);
      });

      const dialog = await screen.findByRole('dialog');
      const dialogTitle = screen.getByText(mockDialogTitle);
      const dialogContent = screen.getByText(mockDialogContent);
      const confirmButton = screen.getByTestId('dialog-confirm-button');
      const cancelButton = screen.getByTestId('dialog-cancel-button');

      expect(dialog).toBeInTheDocument();
      expect(dialogTitle).toBeInTheDocument();
      expect(dialogContent).toBeInTheDocument();
      expect(confirmButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
      expect(dialog).toBeVisible();
      expect(dialogTitle).toBeVisible();
      expect(dialogContent).toBeVisible();
      expect(confirmButton).toBeVisible();
      expect(cancelButton).toBeVisible();
      expect(confirmButton).toHaveRole('button');
      expect(cancelButton).toHaveRole('button');
      expect(confirmButton).toHaveAccessibleName('Clear');
      expect(cancelButton).toHaveAccessibleName('Cancel');
    });

    it('clears the form when clear is clicked on confirmation dialog', async () => {
      render(
        <ContactForm
          formSelector={mockFormSelector}
          setFormValues={mockSetFormValues}
          handleSubmit={mockHandleSubmit}
          handleReset={mockHandleReset}
          submitLabel="Submit"
          resetConfirmationProps={mockResetConfirmationProps}
        />
      );

      const resetButton = screen.getByRole('button', { name: 'Clear' });
      const firstNameInput = screen.getByLabelText('First name *');
      const lastNameInput = screen.getByLabelText('Last name *');

      act(() => {
        fireEvent.click(resetButton);
      });

      const dialogConfirmButton = await screen.findByTestId(
        'dialog-confirm-button'
      );

      act(() => {
        fireEvent.click(dialogConfirmButton);
      });

      await waitFor(() => {
        expect(mockHandleReset).toHaveBeenCalled();
        expect(firstNameInput).toHaveValue('');
        expect(lastNameInput).toHaveValue('');
        expect(dialogConfirmButton).not.toBeInTheDocument();
      });
    });

    it('does not clear the form when cancel is clicked on confirmation dialog', async () => {
      render(
        <ContactForm
          formSelector={mockFormSelector}
          setFormValues={mockSetFormValues}
          handleSubmit={mockHandleSubmit}
          handleReset={mockHandleReset}
          submitLabel="Submit"
          resetConfirmationProps={mockResetConfirmationProps}
        />
      );

      const resetButton = screen.getByRole('button', { name: 'Clear' });
      const firstNameInput = screen.getByLabelText('First name *');
      const lastNameInput = screen.getByLabelText('Last name *');

      act(() => {
        fireEvent.click(resetButton);
      });

      const dialogCancelButton = await screen.findByTestId(
        'dialog-cancel-button'
      );

      act(() => {
        fireEvent.click(dialogCancelButton);
      });

      await waitFor(() => {
        expect(mockHandleReset).not.toHaveBeenCalled();
        expect(firstNameInput).not.toHaveValue('');
        expect(lastNameInput).not.toHaveValue('');
        expect(dialogCancelButton).not.toBeInTheDocument();
      });
    });
  });
});
