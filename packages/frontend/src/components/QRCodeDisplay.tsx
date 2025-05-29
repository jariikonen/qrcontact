import { useState } from 'react';
import { Box, Button, Link, Stack } from '@mui/material';
import { QRCodeBitmap } from './QRCode/QRCodeBitmap';
import { QRCodeVector } from './QRCode/QRCodeVector';

export interface QRCodeDisplayProps {
  content: string;
}

/**
 * Component for displaying a QR code and providing download options.
 *
 * @param {QRCodeDisplayProps} props - Props for the QRCodeDisplay component.
 * @returns {JSX.Element} Rendered QRCodeDisplay component.
 */
export default function QRCodeDisplay({ content }: QRCodeDisplayProps) {
  const [bitmapDownloadHref, setBitmapDownloadHref] = useState('');
  const [vectorDownloadHref, setVectorDownloadHref] = useState('');

  return (
    <Box
      id="qrcode-display"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: { xs: 3, lg: 0 } }}
    >
      <Box style={{ marginRight: '1rem' }}>
        <QRCodeVector
          content={content}
          setDownloadHref={setVectorDownloadHref}
        />
        <QRCodeBitmap
          content={content}
          setDownloadHref={setBitmapDownloadHref}
          hidden
        />
      </Box>
      {content && (
        <Stack spacing={2} direction={'column'}>
          <Link href={vectorDownloadHref} download="qrcode.svg">
            <Button variant="contained" size="small">
              Download SVG
            </Button>
          </Link>
          <Link href={bitmapDownloadHref} download="qrcode.png">
            <Button variant="contained" size="small">
              Download PNG
            </Button>
          </Link>
        </Stack>
      )}
    </Box>
  );
}
