import { act } from 'react';
import { render, screen } from '@testing-library/react';
import VCardDisplay from '.';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://example.com/vcard.vcf'),
});

describe('VCardDisplay', () => {
  const mockVCardString =
    'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pertti Mäkynen\nEND:VCARD';
  const mockSetVCardString = vi.fn();
  const mockSetVCardEdited = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(
      <VCardDisplay
        vCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setVCardEdited={mockSetVCardEdited}
      />
    );

    const downloadButton = screen.getByRole('button', {
      name: 'Download vCard file',
    });
    expect(downloadButton).toHaveAttribute(
      'href',
      'http://example.com/vcard.vcf'
    );
    expect(downloadButton).toHaveAttribute('download', 'vcard.vcf');

    const editButton = screen.getByRole('button', { name: 'Edit vCard' });
    expect(editButton).toBeInTheDocument();
  });

  it('opens the vCard editor when edit button is clicked', async () => {
    render(
      <VCardDisplay
        vCardString={mockVCardString}
        setVCardString={mockSetVCardString}
        setVCardEdited={mockSetVCardEdited}
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit vCard' });
    act(() => editButton.click());

    const vCardEditor = await screen.findByTestId('vcard-editor');
    expect(vCardEditor).toBeInTheDocument();
  });
});
