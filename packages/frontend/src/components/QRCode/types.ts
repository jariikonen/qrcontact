export interface QRCodeProps {
  /**
   * Content to be encoded in the QR code.
   */
  content: string;

  /**
   * Function to set the href of the download link.
   *
   * You can use this to provide a download link for the QR code, like this:
   * ```tsx
   * <a href={downloadHref} download="qrcode.svg">
   * ```
   */
  setDownloadHref: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Size of the QR code in pixels.
   * @defaultValue 128
   */
  size?: number;

  /**
   * If true the QR code is not displayed.
   * @defaultValue false
   */
  hidden?: boolean;

  /**
   * The Error Correction Level to use.
   * @see https://www.qrcode.com/en/about/error_correction.html
   * @defaultValue L
   */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}
