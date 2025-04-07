import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeComponentProps } from './types';
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
  hidden = false,
  size = 128,
  errorCorrectionLevel = 'L',
}: QRCodeComponentProps) => {
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
      canvasElement.toBlob((blob) => {
        if (blob) {
          setDownloadHref(URL.createObjectURL(blob));
        }
      }, 'image/png');
    }
  }, [canvasElement, setDownloadHref, content]);
  /* const blob = new Blob([canvasElement.toDataURL('image/png')], {
        type: 'image/png',
      });
      setDownloadHref(URL.createObjectURL(blob));
    }
  }, [canvasElement, setDownloadHref, content]); */

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
