import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

type DownloadButtonProps = ButtonProps & {
  href: string;
  download: string;
};

function DownloadButton({
  href,
  download,
  onKeyDown,
  ...rest
}: DownloadButtonProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
      (event.currentTarget as HTMLElement).click(); // Simulate click
    }

    // Call any user-provided onKeyDown
    if (onKeyDown) {
      onKeyDown(event as unknown as React.KeyboardEvent<HTMLButtonElement>);
    }
  };

  return (
    <Button
      component="a"
      href={href}
      download={download}
      onKeyDown={handleKeyDown}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}

export default DownloadButton;
