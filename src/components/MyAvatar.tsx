import React from 'react';
import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Image from 'material-ui-image';
import { Skeleton } from '@material-ui/lab';
import { BACKEND_URL } from '../utils/axiosClient';

type Sizes = 'small' | 'medium' | 'large' | 'xl';
type Subject = 'user' | 'store' | 'article';
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
    backgroundColor: theme.palette.primary.main,
    borderRadius: ({ shape }) => (shape === 'circle' ? 30 : theme.spacing(1)),
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
      : size === 'large'
      ? classes.largeAvatar
      : size === 'xl'
      ? classes.xlAvatar
      : classes.mediumAvatar;

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
