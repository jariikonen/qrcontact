/* eslint-disable react/jsx-props-no-spreading */
import { Fragment, useState } from 'react';
import { Box, Button } from '@mui/material';
import VCardEditor from './VCardEditor';
import DownloadButton from '../DownloadButton';

export interface VCardDisplayProps {
  /** VCard content as a string. */
  vCardString: string;

  /** Function for setting the vCard string state variable. */
  setVCardString: (vCardString: string) => void;

  /** Function for setting the vCardEdited state variable. */
  setVCardEdited: (vCardEdited: boolean) => void;
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
  setVCardEdited,
  ...other
}: VCardDisplayProps) {
  const [downloadHref, setDownloadHref] = useState('');

  const handleEditorOpen = () => {
    setVCardEditorOpen(true);
  };

  const handleEditorClose = () => {
    setVCardEditorOpen(false);
  };

  const [vCardEditorOpen, setVCardEditorOpen] = useState(false);

  if (!vCardString) {
    return null;
  }

  return (
    <Fragment>
      <Box {...other}>
        <Box
          id="vcard-display"
          sx={{ margin: '1rem 0' }}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <DownloadButton
            href={downloadHref}
            download="vcard.vcf"
            variant="contained"
            size="small"
          >
            Download vCard file
          </DownloadButton>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEditorOpen()}
            style={{ marginLeft: '0.5rem' }}
          >
            Edit vCard
          </Button>
        </Box>
      </Box>
      <VCardEditor
        vCardString={vCardString}
        setVCardString={setVCardString}
        setVCardEdited={setVCardEdited}
        setDownloadHref={setDownloadHref}
        open={vCardEditorOpen}
        handleClose={handleEditorClose}
        data-testid="vcard-editor"
      />
    </Fragment>
  );
}
