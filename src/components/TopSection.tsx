import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import Notifications from '@material-ui/icons/Notifications';
import baseStyles from '../style/styles';

enum Variants {
  SIMPLE = 'simple',
  USER = 'user',
}

const { SIMPLE, USER } = Variants;

export { SIMPLE, USER };

interface Props {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  variant: Variants;
  userName?: string;
}

const TopSection: React.FC<Props> = ({
  leftChild,
  rightChild,
  variant = Variants.SIMPLE,
  userName,
}) => {
  const baseClasses = baseStyles();

  const UserAvatar = () => (
    <Avatar
      className={baseClasses.mediumAvatar}
      alt={userName}
      src={`${process.env.PUBLIC_URL}/avatar.png`}
    />
  );

  const LeftNode = variant === USER ? <UserAvatar /> : leftChild;
  const RightNode = variant === USER ? <Notifications style={{ fontSize: 30 }} /> : rightChild;

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        direction="row"
        alignItems="center"
      >
        <Grid item>{LeftNode}</Grid>
        <Grid item>{RightNode}</Grid>
      </Grid>
    </Grid>
  );
};

export default TopSection;
