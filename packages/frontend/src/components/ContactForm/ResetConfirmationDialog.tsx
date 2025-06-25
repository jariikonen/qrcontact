import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface ResetConfirmationDialogProps {
  dialogTitle: string;
  dialogContent: string;
  open: boolean;
  handleCancel: () => void;
  handleClose: () => void;
  handleReset: () => void;
  resetLabel?: string;
  cancelLabel?: string;
}

export function ResetConfirmationDialog({
  dialogTitle,
  dialogContent,
  handleCancel,
  handleClose,
  handleReset,
  resetLabel = 'Clear',
  cancelLabel = 'Cancel',
  open,
}: ResetConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      closeAfterTransition={false}
    >
      <DialogTitle id="reset-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="reset-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-testid="dialog-cancel-button" onClick={handleCancel}>
          {cancelLabel}
        </Button>
        <Button data-testid="dialog-confirm-button" onClick={handleReset}>
          {resetLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
