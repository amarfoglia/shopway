import React from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Image from 'material-ui-image';
import { Skeleton } from '@material-ui/lab';

type Sizes = 'small' | 'medium' | 'large' | 'xl';

interface AvatarProps {
  imagePath?: string;
  text?: string;
  size: Sizes;
  alt: string;
}

const useStyles = makeStyles((theme) => ({
  textAvatar: {
    textTransform: 'uppercase',
    backgroundColor: theme.palette.primary.main,
  },
  imgAvatar: {
    borderRadius: 30,
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(2),
  },
  mediumAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.spacing(3),
  },
  largeAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: theme.spacing(3),
  },
  xlAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    '& > p': {
      fontSize: theme.spacing(5),
    },
  },
}));

const MyAvatar: React.FC<AvatarProps> = ({ text, imagePath, size, alt }) => {
  const classes = useStyles();
  const sizeClass =
    size === 'small'
      ? classes.smallAvatar
      : size === 'large'
      ? classes.largeAvatar
      : size === 'xl'
      ? classes.xlAvatar
      : classes.mediumAvatar;

  const renderImageAvatar = (path: string) => (
    <div className={clsx(sizeClass, classes.imgAvatar)}>
      <Image
        src={path}
        alt={alt}
        loading={
          <Skeleton variant="circle" animation="wave" width={'inherit'} height={'inherit'} />
        }
      />
    </div>
  );

  const renderTextAvatar = () => (
    <Avatar className={clsx(sizeClass, classes.textAvatar)} alt={alt}>
      <Typography variant={'body2'}>{text?.charAt(0)}</Typography>
    </Avatar>
  );

  return imagePath ? renderImageAvatar(imagePath) : renderTextAvatar();
};

export default MyAvatar;
