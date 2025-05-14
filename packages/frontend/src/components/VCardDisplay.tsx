import { useState } from 'react';
import { Box, Button, Link } from '@mui/material';
import VCardBox from './VCardBox';

export interface VCardBoxProps {
  /** VCard content as a string. */
  vCardString: string;

  /** Function for setting the vCard string state variable. */
  setVCardString: (vCardString: string) => void;

  /** State of the VCard editor box. */
  vCardBoxOpen: boolean;

  /** Function for setting the state of the vCard editor box. */
  setVCardBoxOpen: (vCardBoxOpen: boolean) => void;

  /** Callback function that is executed when the box is opened. */
  handleBoxOpen?: () => void;
}

/**
 * Component for displaying a vCard string and providing options to download it
 * and show/hide the vCard editor.
 *
 * @param {VCardBoxProps} props - Props for the VCardDisplay component.
 * @returns {JSX.Element} Rendered VCardDisplay component.
 */
export default function VCardDisplay({
  vCardString,
  setVCardString,
  vCardBoxOpen,
  setVCardBoxOpen,
  handleBoxOpen: handleBoxOpenOutside,
}: VCardBoxProps) {
  const [downloadHref, setDownloadHref] = useState('');

  const handleBoxOpen = () => {
    const previouslyOpen = vCardBoxOpen;
    setVCardBoxOpen(!vCardBoxOpen);
    if (!previouslyOpen && handleBoxOpenOutside) {
      handleBoxOpenOutside();
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
          onClick={() => handleBoxOpen()}
          style={{ marginLeft: '0.5rem' }}
        >
          {vCardBoxOpen ? 'Hide' : 'Show'} VCard editor
        </Button>
      </Box>
      <VCardBox
        vCardString={vCardString}
        setVCardString={setVCardString}
        setDownloadHref={setDownloadHref}
        hidden={!vCardBoxOpen}
      />
    </Box>
  );
}
