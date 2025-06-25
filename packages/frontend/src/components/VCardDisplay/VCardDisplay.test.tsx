import { render, screen } from '@testing-library/react';
import VCardDisplay from '.';
import { act } from 'react';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://example.com/vcard.vcf'),
});

describe('VCardDisplay', () => {
  const vCardString =
    'BEGIN:VCARD\nVERSION:3.0\nFN;CHARSET=utf-8:Pertti Mäkynen\nEND:VCARD';

  it('renders the component correctly', () => {
    const setVCardString = vi.fn();
    render(
      <VCardDisplay vCardString={vCardString} setVCardString={setVCardString} />
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

  it('opend the vCard editor when edit button is clicked', async () => {
    const setVCardString = vi.fn();
    render(
      <VCardDisplay vCardString={vCardString} setVCardString={setVCardString} />
    );

    const editButton = screen.getByRole('button', { name: 'Edit vCard' });
    act(() => editButton.click());

    const vCardEditor = await screen.findByTestId('vcard-editor');
    expect(vCardEditor).toBeInTheDocument();
  });
});
