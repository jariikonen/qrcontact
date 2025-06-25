import { render, screen } from '@testing-library/react';
import QRCodeDisplay from './QRCodeDisplay';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://example.com/blob.svg'),
});

describe('QRCodeDisplay', () => {
  const vCardString =
    'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pertti Mäkynen\nEND:VCARD';

  it('renders the component', () => {
    const formVCardString = vCardString;
    render(
      <QRCodeDisplay
        vCardString={vCardString}
        formVCardString={formVCardString}
      />
    );
    const display = screen.getByTestId('qr-code-display');
    expect(display).toBeInTheDocument();
    expect(display).toBeVisible();
  });

  it('displays only one visible qr code', () => {
    const formVCardString = vCardString;
    render(
      <QRCodeDisplay
        vCardString={vCardString}
        formVCardString={formVCardString}
      />
    );
    const qrCodeImages = screen.getByRole('img');
    expect(qrCodeImages).toBeVisible();
  });

  it('renders both buttons', () => {
    const formVCardString = vCardString;
    render(
      <QRCodeDisplay
        vCardString={vCardString}
        formVCardString={formVCardString}
      />
    );
    const vectorButton = screen.getByRole('button', { name: 'Download SVG' });
    const bitmapButton = screen.getByRole('button', { name: 'Download PNG' });
    expect(vectorButton).toBeInTheDocument();
    expect(vectorButton).toBeVisible();
    expect(bitmapButton).toBeInTheDocument();
    expect(bitmapButton).toBeVisible();
  });

  it('shows a notice when vCardString differs from formVCardString', () => {
    const formVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:John Doe\nEND:VCARD';
    render(
      <QRCodeDisplay
        vCardString={vCardString}
        formVCardString={formVCardString}
      />
    );
    const notice = screen.getByText(/Notice!/i);
    expect(notice).toBeInTheDocument();
    expect(notice).toBeVisible();
  });
});
