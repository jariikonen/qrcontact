import { act } from 'react';
import { render, screen } from '@testing-library/react';
import VCardEditor from './VCardEditor';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://example.com/vcard.vcf'),
});

describe('VCardEditor', () => {
  const mockVCardString =
    'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pertti Mäkynen\nEND:VCARD';
  const mockSetVCardString = vi.fn();
  const mockSetVCardEdited = vi.fn();
  const mockSetDownloadHref = vi.fn();
  const mockHandleClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component correcly', () => {
    render(
      <VCardEditor
        vCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setVCardEdited={mockSetVCardEdited}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue(mockVCardString);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(editButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('calls setVCardString when the edit button is clicked', () => {
    render(
      <VCardEditor
        vCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setVCardEdited={mockSetVCardEdited}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const editButton = screen.getByRole('button', { name: 'Edit' });

    const newVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pirkko Mäkinen\nEND:VCARD';
    const expectedVCardString = newVCardString.replaceAll('\n', '\r\n');
    textArea.value = newVCardString;

    act(() => {
      editButton.click();
    });

    expect(mockSetVCardString).toHaveBeenCalledWith(expectedVCardString);
  });

  it('calls handleClose when the edit button is clicked', () => {
    render(
      <VCardEditor
        vCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setVCardEdited={mockSetVCardEdited}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    act(() => {
      editButton.click();
    });
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
