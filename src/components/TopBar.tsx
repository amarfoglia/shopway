import React from 'react';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import UserAvatar from './MyAvatar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

type Variants = 'simple' | 'user';
type Subject = 'seller' | 'customer';
type Position = 'fixed' | 'sticky' | 'absolute' | 'relative' | 'static' | undefined;

interface Props {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  variant: Variants;
  centerTitle?: string;
  userName?: string;
  userImagePath?: string;
  position?: Position;
  subject?: Subject;
  p?: number;
}

interface StyleProps {
  p?: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: ({ p }) => p ?? theme.spacing(3),
      paddingRight: ({ p }) => p ?? theme.spacing(3),
      paddingTop: ({ p }) => p ?? theme.spacing(2),
      paddingBottom: 0,
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
    notifyIcon: {},
  }),
);

const TopBar: React.FC<Props> = ({
  leftChild,
  rightChild,
  centerTitle,
  variant = 'simple',
  userName,
  userImagePath,
  subject = 'customer',
  position = 'fixed',
  p,
}) => {
  const classes = useStyles({ p });
  const LeftNode =
    variant === 'user' ? (
      <UserAvatar
        text={userName}
        imagePath={userImagePath}
        size={'large'}
        subject={subject === 'customer' ? 'user' : 'store'}
        alt={`${userName}'s avatar`}
      />
    ) : (
      leftChild
    );
  const RightNode =
    variant === 'user' ? (
      <Badge badgeContent={1} color="primary" overlap="circular">
        <NotificationsOutlined fontSize="large" />
      </Badge>
    ) : (
      rightChild
    );
  return (
    <div>
      <AppBar position={position} elevation={0} color="transparent" className={classes.root}>
        <Toolbar disableGutters>
          {LeftNode}
          <Typography variant="h6" className={classes.title}>
            {centerTitle}
          </Typography>
          {RightNode ? RightNode : <IconButton disabled />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
