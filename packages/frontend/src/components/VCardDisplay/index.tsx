import { useState } from 'react';
import { Box, Button, Link } from '@mui/material';
import VCardEditor from './VCardEditor';

export interface VCardDisplayProps {
  /** VCard content as a string. */
  vCardString: string;

  /** Function for setting the vCard string state variable. */
  setVCardString: (vCardString: string) => void;

  /** State of the VCard editor box. */
  vCardEditorOpen: boolean;

  /** Function for setting the state of the vCard editor box. */
  setVCardEditorOpen: (vCardEditorOpen: boolean) => void;

  /** Callback function that is executed when the box is opened. */
  handleEditorOpen: () => void;
}

/**
 * Component for displaying a vCard string and providing options to download it
 * and show/hide the vCard editor.
 *
 * @param {VCardDisplayProps} props - Props for the VCardDisplay component.
 * @returns {JSX.Element} Rendered VCardDisplay component.
 */
export default function VCardDisplay({
  vCardString,
  setVCardString,
  vCardEditorOpen,
  setVCardEditorOpen,
  handleEditorOpen: handleEditorOpenOutside,
}: VCardDisplayProps) {
  const [downloadHref, setDownloadHref] = useState('');

  const handleEditorOpen = () => {
    const previouslyOpen = vCardEditorOpen;
    setVCardEditorOpen(!vCardEditorOpen);
    if (!previouslyOpen && handleEditorOpenOutside) {
      handleEditorOpenOutside();
    }
  };

  if (!vCardString) {
    return null;
  }

  return (
    <Box>
      <Box
        id="vcard-display"
        sx={{ margin: '1rem 0' }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Link href={downloadHref} download="vcard.vcf">
          <Button variant="contained" size="small">
            Download VCard file
          </Button>
        </Link>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleEditorOpen()}
          style={{ marginLeft: '0.5rem' }}
        >
          {vCardEditorOpen ? 'Hide' : 'Show'} VCard editor
        </Button>
      </Box>
      <VCardEditor
        vCardString={vCardString}
        setVCardString={setVCardString}
        setDownloadHref={setDownloadHref}
        hidden={!vCardEditorOpen}
      />
    </Box>
  );
}
