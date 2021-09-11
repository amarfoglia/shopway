import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Notifications from '@material-ui/icons/Notifications';
import UserAvatar from './MyAvatar';

type Variants = 'simple' | 'user';
type Position = 'fixed' | 'sticky' | 'absolute' | 'inherit';

interface Props {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  variant: Variants;
  centerTitle?: string;
  userName?: string;
  userImagePath?: string;
  position?: Position;
}

const TopSection: React.FC<Props> = ({
  leftChild,
  rightChild,
  centerTitle,
  variant = 'simple',
  userName,
  userImagePath,
  position = 'inherit',
}) => {
  const LeftNode =
    variant === 'user' ? (
      <UserAvatar
        text={userName}
        imagePath={userImagePath}
        size={'large'}
        alt={`avatar of user ${userName}`}
      />
    ) : (
      leftChild
    );
  const RightNode = variant === 'user' ? <Notifications style={{ fontSize: 30 }} /> : rightChild;

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      direction="row"
      alignItems="center"
      style={{ position: position }}
    >
      <Grid item xs={4}>
        {LeftNode}
      </Grid>
      {centerTitle && (
        <Grid item xs={4}>
          <Typography variant="h6" align="center">
            {centerTitle}
          </Typography>
        </Grid>
      )}
      <Grid item xs={4} style={{ textAlign: 'right' }}>
        {RightNode}
      </Grid>
    </Grid>
  );
};

export default TopSection;
