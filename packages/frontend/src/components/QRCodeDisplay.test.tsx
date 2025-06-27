import { render, screen } from '@testing-library/react';
import QRCodeDisplay from './QRCodeDisplay';
import { defaultContactFormValues } from './ContactForm/types';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://example.com/blob.svg'),
});

describe('QRCodeDisplay', () => {
  const mockVCardString =
    'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pertti Mäkynen\nEND:VCARD';
  const mockContactFormValues = {
    ...defaultContactFormValues,
    firstName: 'Pertti',
    lastName: 'Mäkynen',
  };

  it('renders the component', () => {
    render(
      <QRCodeDisplay
        vCardString={mockVCardString}
        vCardData={mockContactFormValues}
        originalVCardString={mockVCardString}
        currentFormData={mockContactFormValues}
      />
    );
    const display = screen.getByTestId('qr-code-display');
    expect(display).toBeInTheDocument();
    expect(display).toBeVisible();
  });

  it('displays only one visible qr code', () => {
    render(
      <QRCodeDisplay
        vCardString={mockVCardString}
        vCardData={mockContactFormValues}
        originalVCardString={mockVCardString}
        currentFormData={mockContactFormValues}
      />
    );
    const qrCodeImages = screen.getByRole('img');
    expect(qrCodeImages).toBeVisible();
  });

  it('renders both buttons', () => {
    render(
      <QRCodeDisplay
        vCardString={mockVCardString}
        vCardData={mockContactFormValues}
        originalVCardString={mockVCardString}
        currentFormData={mockContactFormValues}
      />
    );
    const vectorButton = screen.getByRole('button', { name: 'Download SVG' });
    const bitmapButton = screen.getByRole('button', { name: 'Download PNG' });
    expect(vectorButton).toBeInTheDocument();
    expect(vectorButton).toBeVisible();
    expect(bitmapButton).toBeInTheDocument();
    expect(bitmapButton).toBeVisible();
  });

  it('displays a notice when vCardData differs from currentFormData', () => {
    const editedFormData = {
      ...mockContactFormValues,
      firstName: 'John',
      lastName: 'Doe',
    };
    render(
      <QRCodeDisplay
        vCardString={mockVCardString}
        vCardData={mockContactFormValues}
        originalVCardString={mockVCardString}
        currentFormData={editedFormData}
      />
    );
    const notice = screen.getByText(/Notice!/i);
    expect(notice).toBeInTheDocument();
    expect(notice).toBeVisible();
  });

  it('displays a notice when vCardString differs from originalVCardString', () => {
    const editedVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Jaana Tikkanen\nEND:VCARD';
    render(
      <QRCodeDisplay
        vCardString={editedVCardString}
        vCardData={mockContactFormValues}
        originalVCardString={mockVCardString}
        currentFormData={mockContactFormValues}
      />
    );
    const notice = screen.getByText(/Notice!/i);
    expect(notice).toBeInTheDocument();
    expect(notice).toBeVisible();
  });
});
