import { render, screen, waitFor } from '@testing-library/react';
import { QRCodeBitmap } from './QRCodeBitmap';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://example.com/blob.png'),
});

describe('QRCodeBitmap', () => {
  const content =
    'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pertti Mäkynen\nEND:VCARD';

  it('renders the qr code', () => {
    const setDownloadHref = vi.fn();
    render(
      <QRCodeBitmap content={content} setDownloadHref={setDownloadHref} />
    );

    const qrCodeImage = screen.getByRole('img');
    expect(qrCodeImage).toBeInTheDocument();
    expect(qrCodeImage).toBeVisible();
  });

  it('sets the download href correctly', async () => {
    const setDownloadHref = vi.fn();
    render(
      <QRCodeBitmap content={content} setDownloadHref={setDownloadHref} />
    );

    await waitFor(() =>
      expect(setDownloadHref).toHaveBeenCalledWith(
        'http://example.com/blob.png'
      )
    );
  });
});
