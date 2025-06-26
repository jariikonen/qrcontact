import { act } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { render, screen, waitFor } from '@testing-library/react';
import PhoneNumberInput from './index.tsx';
import { phoneNumberTypeOptions } from './constants.ts';
import { PhoneNumberTypeOption } from './types.ts';

vi.stubGlobal(
  'ResizeObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);

interface FormValues {
  phone: {
    preferred: boolean;
    type: PhoneNumberTypeOption;
    number: string;
  }[];
}

function TestForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      phone: [
        {
          preferred: false,
          type: phoneNumberTypeOptions[0],
          number: '',
        },
      ],
    },
  });

  const {
    fields: phoneFields,
    insert,
    remove,
  } = useFieldArray({
    name: 'phone',
    control,
    shouldUnregister: false,
  });

  function handleInsert(id: number) {
    insert(id, {
      preferred: false,
      type: phoneNumberTypeOptions[0],
      number: '',
    });
  }

  return (
    <form onSubmit={(e) => void handleSubmit(() => {})(e)}>
      {phoneFields.map((field, index) => {
        return (
          <PhoneNumberInput
            key={field.id}
            namePreferred={`phone.${index}.preferred`}
            nameType={`phone.${index}.type`}
            nameNumber={`phone.${index}.number`}
            control={control}
            fields={phoneFields}
            field={field}
            handleInsert={() => handleInsert(index + 1)}
            remove={remove}
            index={index}
            externalErrors={errors}
            data-testid="phone-number-input"
          />
        );
      })}
    </form>
  );
}

describe('PhoneNumberInput', () => {
  it('renders the component', () => {
    render(<TestForm />);
    const phoneInput = screen.getByTestId('phone-number-input');
    expect(phoneInput).toBeInTheDocument();
  });

  it('renderes all fields correctly', () => {
    render(<TestForm />);

    const preferredCheckbox = screen.getByLabelText('Preferred');
    const typeSelect = screen.getByRole('combobox', {
      name: 'Type',
    });
    const numberInput = screen.getByLabelText('Phone number');

    expect(preferredCheckbox).toBeInTheDocument();
    expect(preferredCheckbox).toHaveProperty('type', 'checkbox');
    expect(preferredCheckbox).toHaveProperty('checked', false);
    expect(typeSelect).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
  });

  it('adds a new field when add button is pressed', async () => {
    render(<TestForm />);

    const addButton = screen.getByRole('button', {
      name: 'add phone number after phone number 1',
    });
    expect(addButton).toBeInTheDocument();

    act(() => {
      addButton.click();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('phone-number-input')).toHaveLength(2);
    });
  });

  it('removes a field when remove button is pressed', async () => {
    render(<TestForm />);

    const addButton = screen.getByRole('button', {
      name: 'add phone number after phone number 1',
    });
    expect(addButton).toBeInTheDocument();

    act(() => {
      addButton.click();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('phone-number-input')).toHaveLength(2);
    });

    const removeButton = screen.getByRole('button', {
      name: 'remove phone number 2',
    });
    expect(removeButton).toBeInTheDocument();

    act(() => {
      removeButton.click();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('phone-number-input')).toHaveLength(1);
    });
  });
});
