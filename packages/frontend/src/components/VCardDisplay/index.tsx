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

  /**
   * The original vCard string, that was created when the form was submitted.
   *
   * Used in the editor for detecting wether the vCard string has really
   * changed and for resetting the vCard to the original.
   */
  originalVCardString: string;
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
  originalVCardString,
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
        originalVCardString={originalVCardString}
        setDownloadHref={setDownloadHref}
        open={vCardEditorOpen}
        handleClose={handleEditorClose}
        data-testid="vcard-editor"
      />
    </Fragment>
  );
}
