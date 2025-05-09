export interface QRCodeProps {
  /** Content to be encoded in the QR code. */
  content: string;

  /** Size of the QR code in pixels. */
  size?: number;

  /**
   * The Error Correction Level to use.
   * @see https://www.qrcode.com/en/about/error_correction.html
   */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

export interface QRCodeComponentProps extends QRCodeProps {
  /**
   * Function to set the href of the download link.
   *
   * Component creates a blob out of the QR code image and sets the href to the
   * blob URL.
   */
  setDownloadHref: React.Dispatch<React.SetStateAction<string>>;

  /** Boolean indicating whether the element is displayed or not. */
  hidden?: boolean;
}
