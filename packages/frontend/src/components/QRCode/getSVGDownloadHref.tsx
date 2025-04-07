import { renderToString } from 'react-dom/server';
import { QRCodeSVG } from 'qrcode.react';
import { QRCodeProps } from './types';

export default function getSVGDownloadHref({
  content,
  size = 128,
  errorCorrectionLevel = 'L',
}: QRCodeProps): string {
  let svgStr =
    '<?xml version="1.0" standalone="no"?>' +
    renderToString(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={size}
        height={size}
      >
        <QRCodeSVG
          value={content}
          size={size}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={errorCorrectionLevel}
          marginSize={0}
        />
      </svg>
    );
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}
