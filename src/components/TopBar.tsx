import React from 'react';
import Notifications from '@material-ui/icons/Notifications';
import UserAvatar from './MyAvatar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

type Variants = 'simple' | 'user';
type Position = 'fixed' | 'sticky' | 'absolute' | 'relative' | 'static' | undefined;

interface Props {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  variant: Variants;
  centerTitle?: string;
  userName?: string;
  userImagePath?: string;
  position?: Position;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      paddingBottom: 0,
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  }),
);

const TopBar: React.FC<Props> = ({
  leftChild,
  rightChild,
  centerTitle,
  variant = 'simple',
  userName,
  userImagePath,
  position = 'fixed',
}) => {
  const classes = useStyles();
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
  const RightNode = variant === 'user' ? <Notifications /> : rightChild;
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
