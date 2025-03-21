import { Box, TextField } from '@mui/material';
import { useEffect } from 'react';

export interface VCardBoxProps {
  /**
   * The vCard string to display in the text field.
   */
  vCardString: string;

  /**
   * A function to set the vCard string when it is updated.
   */
  setVCardString: React.Dispatch<React.SetStateAction<string>>;

  /**
   * A function to set the download href.
   */
  setDownloadHref: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Boolean indicating whether the component is hidden.
   * @default false
   */
  hidden?: boolean;
}

export default function VCardBox({
  vCardString,
  setVCardString,
  setDownloadHref,
  hidden = false,
}: VCardBoxProps) {
  useEffect(() => {
    const href =
      'data:text/vcard;charset=utf-8,' + encodeURIComponent(vCardString);
    setDownloadHref(href);
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
          console.log(e.target.value);
          setVCardString(e.target.value);
        }}
      />
    </Box>
  );
}
