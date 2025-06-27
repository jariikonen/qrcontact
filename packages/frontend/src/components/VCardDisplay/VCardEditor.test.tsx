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
  const mockSetDownloadHref = vi.fn();
  const mockHandleClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component correcly', () => {
    render(
      <VCardEditor
        vCardString={mockVCardString}
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
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

  it('calls setVCardString when vCardString has been changed and the edit button is clicked', () => {
    render(
      <VCardEditor
        vCardString={mockVCardString}
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
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
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
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

  it('does not call setVCardString when the cancel button is clicked', () => {
    render(
      <VCardEditor
        vCardString={mockVCardString}
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    const newVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pirkko Mäkinen\nEND:VCARD';
    textArea.value = newVCardString;

    act(() => {
      cancelButton.click();
    });

    expect(mockSetVCardString).not.toHaveBeenCalled();
  });

  it('calls handleClose when the cancel button is clicked', () => {
    render(
      <VCardEditor
        vCardString={mockVCardString}
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    act(() => {
      cancelButton.click();
    });

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it('renders reset button when vCardString differs from originalVCardString', () => {
    const editedVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pirkko Mäkinen\nEND:VCARD';
    render(
      <VCardEditor
        vCardString={editedVCardString}
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );

    const resetButton = screen.getByRole('button', { name: 'Reset' });

    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeVisible();
  });

  it('calls setVCardString with originalVCardString when the reset button is clicked', () => {
    const editedVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pirkko Mäkinen\nEND:VCARD';
    render(
      <VCardEditor
        vCardString={editedVCardString}
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );

    const resetButton = screen.getByRole('button', { name: 'Reset' });

    act(() => {
      resetButton.click();
    });

    expect(mockSetVCardString).toBeCalledWith(mockVCardString);
  });

  it('calls handleClose when the reset button is clicked', () => {
    const editedVCardString =
      'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pirkko Mäkinen\nEND:VCARD';
    render(
      <VCardEditor
        vCardString={editedVCardString}
        originalVCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setDownloadHref={mockSetDownloadHref}
        open={true}
        handleClose={mockHandleClose}
      />
    );

    const resetButton = screen.getByRole('button', { name: 'Reset' });

    act(() => {
      resetButton.click();
    });

    expect(mockHandleClose).toBeCalled();
  });
});
