import { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRCodeComponentProps } from './types';
import { Box } from '@mui/material';
import getSVGDownloadHref from './getSVGDownloadHref';

/**
 * Component for generating a QR code as a vector image (SVG).
 *
 * @param {QRCodeComponentProps} props - Props for the QRCodeVector component.
 * @returns {JSX.Element} Rendered QRCodeVector component.
 */
export const QRCodeVector = ({
  content,
  setDownloadHref,
  size = 128,
  hidden = false,
  errorCorrectionLevel = 'L',
}: QRCodeComponentProps) => {
  useEffect(() => {
    setDownloadHref(
      getSVGDownloadHref({ content, size, errorCorrectionLevel })
    );
  }, [content, errorCorrectionLevel, setDownloadHref, size]);

  return (
    <Box display={hidden ? 'none' : 'block'}>
      <QRCodeSVG
        value={content}
        size={size}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={errorCorrectionLevel}
        marginSize={0}
      />
    </Box>
  );
};
