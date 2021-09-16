import { CircularProgress, Button, ButtonProps } from '@material-ui/core';
import React from 'react';

interface Props {
  isSubmitting: boolean;
  text: string;
}

const LoadButton: React.FC<Props & ButtonProps> = ({ isSubmitting, text, ...rest }) => {
  return isSubmitting ? (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress size={24} />
    </div>
  ) : (
    <Button disabled={isSubmitting} type="submit" {...rest}>
      {text}
    </Button>
  );
};

export default LoadButton;
