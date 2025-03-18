import { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { QRCodeSVG } from 'qrcode.react';
import { QRCodeProps } from './types';
import { Box } from '@mui/material';

export const QRCodeVector = ({
  content,
  setDownloadHref,
  size = 128,
  hidden = false,
  errorCorrectionLevel = 'L',
}: QRCodeProps) => {
  let svgStr = renderToString(
    <QRCodeSVG
      value={content}
      size={size}
      bgColor={'#ffffff'}
      fgColor={'#000000'}
      level={errorCorrectionLevel}
      marginSize={0}
    />
  );
  const nodes = new DOMParser().parseFromString(svgStr, 'image/svg+xml');
  nodes.documentElement.attributes.removeNamedItem('height');
  nodes.documentElement.attributes.removeNamedItem('width');
  const svgNs = 'http://www.w3.org/2000/svg';
  nodes.documentElement.setAttribute('xmlns', svgNs);
  nodes.documentElement.setAttribute('version', '1.1');

  const rectEl = document.createElementNS(svgNs, 'rect');
  rectEl.setAttribute('width', '100%');
  rectEl.setAttribute('height', '100%');
  rectEl.setAttribute('fill', '#FFFFFF');
  nodes.documentElement.children[0].replaceWith(rectEl);

  svgStr = String(nodes.documentElement.outerHTML);

  const href =
    'data:application/svg+xml,' +
    encodeURIComponent(
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
        svgStr
    );

  useEffect(() => {
    setDownloadHref(href);
  }, [href, setDownloadHref]);

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
