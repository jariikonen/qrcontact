/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { Alert, Box, Grid, Stack } from '@mui/material';
import { deepEqual } from 'fast-equals';
import { QRCodeBitmap } from './QRCode/QRCodeBitmap';
import { QRCodeVector } from './QRCode/QRCodeVector';
import DownloadButton from './DownloadButton';
import { ContactFormValues } from './ContactForm/types';

export interface QRCodeDisplayProps {
  /** The vCardString used as the content of the QR code. */
  vCardString: string;

  /**
   * Form values contained in the vCardString.
   *
   * Used for detecting when the current form data differs from the values in
   * the vCardString. A notification is rendered when the values differ.
   */
  vCardData: ContactFormValues | null;

  /** Boolean indicating wether the vCardString has been manually edited. */
  vCardEdited: boolean;

  /**
   * Current form values.
   *
   * Used for detecting when the current form data differs from the values in
   * the vCardString. A notification is rendered when the values differ.
   */
  currentFormData: ContactFormValues;
}

/**
 * Component for displaying a QR code and providing download options.
 *
 * @param {QRCodeDisplayProps} props - Props for the QRCodeDisplay component.
 * @returns {JSX.Element} Rendered QRCodeDisplay component.
 */
export default function QRCodeDisplay({
  vCardString,
  vCardData,
  vCardEdited,
  currentFormData,
  ...other
}: QRCodeDisplayProps) {
  const [bitmapDownloadHref, setBitmapDownloadHref] = useState('');
  const [vectorDownloadHref, setVectorDownloadHref] = useState('');

  const defaultAlertText =
    'The content of the vCard and QR code is different from the form data. ' +
    'You can set them to the form content using the update button.';
  const vCardEditedAlertText =
    'The vCard has been edited manually. You can set it to the form content ' +
    'using the update button.';
  const [alertText, setAlertText] = useState(defaultAlertText);

  useEffect(() => {
    if (vCardEdited) {
      setAlertText(vCardEditedAlertText);
    } else {
      setAlertText(defaultAlertText);
    }
  }, [defaultAlertText, vCardEdited, vCardEditedAlertText]);

  return (
    <Grid container data-testid="qr-code-display" {...other}>
      {(vCardEdited ||
        (vCardData && !deepEqual(vCardData, currentFormData))) && (
        <Grid size={12}>
          <Box
            id="qr-code-display"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ pt: { xs: 3, lg: 0 }, mb: '1em' }}
          >
            <Alert severity={'info'}>
              <b>Notice!</b> {alertText}
            </Alert>
          </Box>
        </Grid>
      )}
      <Grid size={12}>
        <Box
          id="qrcode-display"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: { xs: 3, lg: 0 } }}
        >
          <Box style={{ marginRight: '1rem' }}>
            <QRCodeVector
              content={vCardString}
              setDownloadHref={setVectorDownloadHref}
            />
            <QRCodeBitmap
              content={vCardString}
              setDownloadHref={setBitmapDownloadHref}
              hidden
            />
          </Box>
          {vCardString && (
            <Stack spacing={2} direction={'column'}>
              <DownloadButton
                href={vectorDownloadHref}
                download="qrcode.svg"
                variant="contained"
                size="small"
              >
                Download SVG
              </DownloadButton>
              <DownloadButton
                href={bitmapDownloadHref}
                download="qrcode.png"
                variant="contained"
                size="small"
              >
                Download PNG
              </DownloadButton>
            </Stack>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
