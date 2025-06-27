/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

export interface VCardEditorProps {
  /** VCard string to display in the text field. */
  vCardString: string;

  /**
   * The original vCard string, that was created when the form was submitted.
   *
   * Used for detecting wether the vCard string has really changed and for
   * resetting the vCard to the original.
   */
  originalVCardString: string;

  /** Function for setting the vCard string state variable. */
  setVCardString: (vCardString: string) => void;

  /** Function for setting the download href state variable. */
  setDownloadHref: React.Dispatch<React.SetStateAction<string>>;

  /** Boolean indicating whether the component is open. */
  open: boolean;

  /** Handler function for closing the editor. */
  handleClose: () => void;
}

/**
 * Component for displaying, editing and downloading the vCard.
 *
 * @param {VCardEditorProps} props - Props for the VCardBox component.
 * @returns {JSX.Element} Rendered VCardBox component.
 */
export default function VCardEditor({
  vCardString,
  setVCardString,
  originalVCardString,
  setDownloadHref,
  open,
  handleClose,
  ...other
}: VCardEditorProps) {
  useEffect(() => {
    const blob = new Blob([vCardString], {
      type: 'text/vcard;charset=UTF-8',
    });
    setDownloadHref(URL.createObjectURL(blob));
  }, [vCardString, setDownloadHref]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newVCardString = formData.get('vcard');
    if (newVCardString != originalVCardString) {
      setVCardString((newVCardString as string).replaceAll('\n', '\r\n'));
    }
    handleClose();
  };

  const handleReset = () => {
    setVCardString(originalVCardString);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
        },
      }}
      maxWidth={'sm'}
      fullWidth
      closeAfterTransition={false}
      {...other}
    >
      <DialogTitle>Edit vCard</DialogTitle>
      <DialogContent>
        <TextField
          name="vcard"
          type="text"
          multiline
          fullWidth
          defaultValue={vCardString}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {vCardString != originalVCardString && (
          <Button onClick={handleReset}>Reset</Button>
        )}
        <Button type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
