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
}

export default function VCardDisplay({
  vCardString,
  setVCardString,
}: VCardBoxProps) {
  const [hideEditorBox, setHideEditorBox] = useState(true);
  const [downloadHref, setDownloadHref] = useState('');

  if (!vCardString) {
    return null;
  }

  return (
    <Box>
      <Box
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
          onClick={() => setHideEditorBox(!hideEditorBox)}
          style={{ marginLeft: '0.5rem' }}
        >
          {hideEditorBox ? 'Show' : 'Hide'} VCard editor
        </Button>
      </Box>
      <VCardBox
        vCardString={vCardString}
        setVCardString={setVCardString}
        setDownloadHref={setDownloadHref}
        hidden={hideEditorBox}
      />
    </Box>
  );
}
