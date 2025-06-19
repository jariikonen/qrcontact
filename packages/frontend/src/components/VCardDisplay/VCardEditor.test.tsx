import { render, screen } from '@testing-library/react';
import VCardEditor from './VCardEditor';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://example.com/vcard.vcf'),
});

describe('VCardEditor', () => {
  const vCardString =
    'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pertti Mäkynen\nEND:VCARD';

  test('renders correcly', () => {
    const setVCardString = vi.fn();
    const setDownloadHref = vi.fn();
    const open = true;
    const handleClose = vi.fn();

    render(
      <VCardEditor
        vCardString={vCardString}
        setVCardString={setVCardString}
        setDownloadHref={setDownloadHref}
        open={open}
        handleClose={handleClose}
      />
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue(vCardString);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(editButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('calls setVCardString on form submit', () => {
    const setVCardString = vi.fn();
    const setDownloadHref = vi.fn();
    const open = true;
    const handleClose = vi.fn();

    render(
      <VCardEditor
        vCardString={vCardString}
        setVCardString={setVCardString}
        setDownloadHref={setDownloadHref}
        open={open}
        handleClose={handleClose}
      />
    );

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const editButton = screen.getByRole('button', { name: 'Edit' });

    const newVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pirkko Mäkinen\nEND:VCARD';
    const expectedVCardString = newVCardString.replaceAll('\n', '\r\n');
    textArea.value = newVCardString;
    editButton.click();
    expect(setVCardString).toHaveBeenCalledWith(expectedVCardString);
  });

  test.todo('calls handleClose on form submit', () => {
    const setVCardString = vi.fn();
    const setDownloadHref = vi.fn();
    const open = true;
    const handleClose = vi.fn();

    render(
      <VCardEditor
        vCardString={vCardString}
        setVCardString={setVCardString}
        setDownloadHref={setDownloadHref}
        open={open}
        handleClose={handleClose}
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    editButton.click();
    expect(handleClose).toHaveBeenCalled();
  });
});
