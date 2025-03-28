import { useState } from 'react';
import { Box, Button, Link } from '@mui/material';
import VCardBox from './VCardBox';

export interface VCardBoxProps {
  /**
   * Contents of the VCard file as a string.
   */
  vCardString: string;

  /**
   * A function to set the VCard string when it is updated.
   */
  setVCardString: React.Dispatch<React.SetStateAction<string>>;

  /**
   * State of the VCard editor box.
   */
  vCardBoxOpen: boolean;

  /**
   * A function to set the state of the VCard editor box.
   */
  setVCardBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Callback function that is executed when the box is opened.
   */
  handleBoxOpen?: () => void;
}

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
