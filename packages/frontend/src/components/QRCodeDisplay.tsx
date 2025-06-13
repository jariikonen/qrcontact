import { useState } from 'react';
import { Alert, Box, Grid, Stack } from '@mui/material';
import { QRCodeBitmap } from './QRCode/QRCodeBitmap';
import { QRCodeVector } from './QRCode/QRCodeVector';
import DownloadButton from './DownloadButton';

export interface QRCodeDisplayProps {
  /** The vCardString used as the content of the QR code. */
  vCardString: string;

  /**
   * The vCardString created from the form data for comparison.
   *
   * If the vCardString differs from formVCardString an alert is displayed to
   * make the user aware of the situation.
   */
  formVCardString: string;
}

/**
 * Component for displaying a QR code and providing download options.
 *
 * @param {QRCodeDisplayProps} props - Props for the QRCodeDisplay component.
 * @returns {JSX.Element} Rendered QRCodeDisplay component.
 */
export default function QRCodeDisplay({
  vCardString,
  formVCardString,
}: QRCodeDisplayProps) {
  const [bitmapDownloadHref, setBitmapDownloadHref] = useState('');
  const [vectorDownloadHref, setVectorDownloadHref] = useState('');

  return (
    <Grid container>
      {vCardString != formVCardString && (
        <Grid size={12}>
          <Box
            id="qrcode-display"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ pt: { xs: 3, lg: 0 }, mb: '1em' }}
          >
            <Alert severity={'info'}>
              <b>Notice!</b> Contents of the vCard and QR code differ from the
              form data. You can restore them to the form content using the
              update button.
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
