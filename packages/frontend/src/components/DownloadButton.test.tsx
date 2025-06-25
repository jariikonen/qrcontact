import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DownloadButton from './DownloadButton';

describe('DownloadButton', () => {
  it('renders the component correctly', () => {
    const href = 'https://example.com/vcard.vcf';
    const download = 'vcard.vcf';
    render(
      <DownloadButton href={href} download={download}>
        Download vCard file
      </DownloadButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(button).toHaveTextContent('Download vCard file');
  });

  it('calls onClick when spacebar is pressed on the button', () => {
    const onClick = vi.fn();
    render(
      <DownloadButton onClick={onClick}>Download vCard file</DownloadButton>
    );

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: ' ' });
    expect(onClick).toHaveBeenCalled();
  });

  it('calls user provided onKeyDown when a key is pressed on the button', () => {
    const onKeyDown = vi.fn();
    render(
      <DownloadButton onKeyDown={onKeyDown}>Download vCard file</DownloadButton>
    );

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'a' });
    expect(onKeyDown).toHaveBeenCalled();

    onKeyDown.mockClear();
    fireEvent.keyDown(button, { key: ' ' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('does not call onClick when a key other than the spacebar is pressed on the button', () => {
    const onClick = vi.fn();
    render(
      <DownloadButton onClick={onClick}>Download vCard file</DownloadButton>
    );

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'a' });
    expect(onClick).not.toHaveBeenCalled();
  });
});
