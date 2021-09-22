import React from 'react';
import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Image from 'material-ui-image';
import { Skeleton } from '@material-ui/lab';
import { BACKEND_URL } from '../utils/axiosClient';

type Sizes = 'small' | 'medium' | 'large' | 'xl' | 'fullWidth';
type Subject = 'user' | 'store' | 'articledetail';
type Shape = 'circle' | 'square';

interface AvatarProps {
  imagePath?: string;
  text?: string;
  size: Sizes;
  alt: string;
  subject?: Subject;
  shape?: Shape;
  handleClick?: () => void;
}

const useStyles = makeStyles<Theme, { shape: Shape }>((theme) => ({
  textAvatar: {
    textTransform: 'uppercase',
    backgroundColor: theme.palette.primary.light,
    borderRadius: ({ shape }) => (shape === 'circle' ? '50%' : theme.spacing(1.5)),
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
  fullWidth: {
    width: '100%',
    height: '100%',
  },
}));

const MyAvatar: React.FC<AvatarProps> = ({
  text,
  imagePath,
  size,
  alt,
  subject = 'user',
  shape = 'circle',
  handleClick,
}) => {
  const classes = useStyles({ shape });
  const sizeClass =
    size === 'small'
      ? classes.smallAvatar
      : size === 'medium'
      ? classes.medium
      : size === 'large'
      ? classes.largeAvatar
      : size === 'xl'
      ? classes.xlAvatar
      : classes.fullWidth;

  const ImageSkeleton = (
    <Skeleton variant="circle" animation="wave" width={'inherit'} height={'inherit'} />
  );

  const renderImageAvatar = (path: string) => {
    const radius = shape === 'circle' ? '50%' : '10%';
    return (
      <div className={sizeClass}>
        {path ? (
          <Image
            style={{ borderRadius: radius }}
            imageStyle={{ borderRadius: radius }}
            src={`${BACKEND_URL}/img/${subject}s/${path}`}
            alt={alt}
            loading={ImageSkeleton}
            onClick={handleClick}
          />
        ) : (
          ImageSkeleton
        )}
      </div>
    );
  };

  const renderTextAvatar = () => (
    <Avatar className={clsx(sizeClass, classes.textAvatar)} alt={alt}>
      <Typography variant={'body2'}>{text?.charAt(0)}</Typography>
    </Avatar>
  );

  return imagePath ? renderImageAvatar(imagePath) : renderTextAvatar();
};

export default MyAvatar;
