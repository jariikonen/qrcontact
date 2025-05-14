import { Box, TextField } from '@mui/material';
import { useEffect } from 'react';

export interface VCardBoxProps {
  /** VCard string to display in the text field. */
  vCardString: string;

  /** Function for setting the vCard string state variable. */
  setVCardString: (vCardString: string) => void;

  /** Function for setting the download href state variable. */
  setDownloadHref: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Boolean indicating whether the component is hidden.
   * @default false
   */
  hidden?: boolean;
}

/**
 * Component for displaying a vCard string in a text field.
 *
 * Any changes to the text field will update the vCard string.
 *
 * @param {VCardBoxProps} props - Props for the VCardBox component.
 * @returns {JSX.Element} Rendered VCardBox component.
 */
export default function VCardBox({
  vCardString,
  setVCardString,
  setDownloadHref,
  hidden = false,
}: VCardBoxProps) {
  useEffect(() => {
    const blob = new Blob([vCardString], {
      type: 'text/vcard;charset=UTF-8',
    });
    setDownloadHref(URL.createObjectURL(blob));
  }, [vCardString, setDownloadHref]);
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ margin: '1rem 0' }}
      display={hidden ? 'none' : 'block'}
    >
      <TextField
        id="vcard-box"
        type="text"
        multiline
        fullWidth
        value={vCardString}
        onChange={(e) => {
          setVCardString(e.target.value);
        }}
      />
    </Box>
  );
}
