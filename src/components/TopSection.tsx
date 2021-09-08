import React from 'react';
import { Grid } from '@material-ui/core';
import Notifications from '@material-ui/icons/Notifications';
import UserAvatar from './MyAvatar';

type Variants = 'simple' | 'user';

interface Props {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  variant: Variants;
  userName?: string;
  userImagePath?: string;
}

const TopSection: React.FC<Props> = ({
  leftChild,
  rightChild,
  variant = 'simple',
  userName,
  userImagePath,
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
    <Grid container spacing={2} justifyContent="space-between" direction="row" alignItems="center">
      <Grid item>{LeftNode}</Grid>
      <Grid item>{RightNode}</Grid>
    </Grid>
  );
};

export default TopSection;
