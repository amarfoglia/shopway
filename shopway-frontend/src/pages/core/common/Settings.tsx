import React, { useState, useContext } from 'react';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Divider,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { useHistory } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import MyAvatar from '../../../components/MyAvatar';
import AuthContext from '../../../hooks/useAuth';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import MyPaper from '../../../components/MyPaper';
import Routes from '../../../utils/routes';
import NotifierContext from '../../../hooks/useNotifier';

const Settings = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const { disconnect, connect, isConnected } = useContext(NotifierContext);
  const history = useHistory();

  const UserAvatarSection = () => (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <MyAvatar
          size="xl"
          alt={`user avatar of ${user?.fullName}`}
          imagePath={user?.photo as string}
          text={user?.fullName}
          subject={user?.role === 'Customer' ? 'user' : 'store'}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5">{user?.fullName}</Typography>
      </Grid>
    </Grid>
  );

  const AccountSection = () => {
    const [isNotifiesOn, setNotifiesOn] = useState(isConnected);
    const handleNotifies = () => {
      if (isNotifiesOn) {
        disconnect();
        setNotifiesOn(false);
      } else {
        user && connect(user);
        setNotifiesOn(true);
      }
    };

    const goToChangePassword = () => history.push(Routes.CHANGE_PASSWORD);
    const goToEditProfile = () =>
      history.push(user?.role === 'Customer' ? Routes.CUSTOMER_EDIT : Routes.SELLER_EDIT);

    return (
      <Grid container spacing={4} direction="column">
        <Grid item xs={12}>
          <MyPaper>
            <List disablePadding>
              <ListItem onClick={goToEditProfile}>
                <ListItemText primary={'Edit profile'} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit profile">
                    <ArrowForwardIos fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem onClick={goToChangePassword}>
                <ListItemText primary={'Change password'} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="change password">
                    <ArrowForwardIos fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </MyPaper>
        </Grid>
        <Grid item xs={12}>
          <MyPaper>
            <List disablePadding>
              <ListItem>
                <ListItemText primary={'Notifications'} />
                <ListItemSecondaryAction>
                  <Switch
                    checked={isNotifiesOn}
                    onChange={handleNotifies}
                    color="primary"
                    name="checkedNotifies"
                    inputProps={{ 'aria-label': 'notifies checkbox' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </MyPaper>
        </Grid>
      </Grid>
    );
  };

  const sections = [
    {
      node: <UserAvatarSection />,
    },
    {
      node: <AccountSection />,
      title: 'Account settings',
    },
  ];

  return <CorePage title="Settings" sections={sections} />;
};

export default Settings;
