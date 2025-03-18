import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeProps } from './types';
import { Box } from '@mui/material';

const getCanvasElementById = (id: string): HTMLCanvasElement => {
  const canvas = document.getElementById(id);

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(`The element of id '${id}' is not a HTMLCanvasElement.`);
  }

  return canvas;
};

export const QRCodeBitmap = ({
  content,
  setDownloadHref,
  size = 128,
  hidden = false,
  errorCorrectionLevel = 'L',
}: QRCodeProps) => {
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null
  );

  useEffect(() => {
    const elem = getCanvasElementById('QRCodeCanvas');
    if (elem) {
      setCanvasElement(elem);
    }
  });

  useEffect(() => {
    if (canvasElement) {
      setDownloadHref(canvasElement.toDataURL('image/png'));
    }
  }, [canvasElement, setDownloadHref]);

  return (
    <Box display={hidden ? 'none' : 'block'}>
      <QRCodeCanvas
        value={content}
        size={size}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={errorCorrectionLevel}
        marginSize={0}
        id="QRCodeCanvas"
      />
    </Box>
  );
};
