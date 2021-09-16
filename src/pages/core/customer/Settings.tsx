import React, { useState } from 'react';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Divider,
  Switch,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import CustomerAvatar from '../../../components/MyAvatar';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import { ArrowForwardIos } from '@material-ui/icons';
import MyPaper from '../../../components/MyPaper';
import PATHS from '../../../utils/routes';

const CustomerSettings = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const UserAvatarSection = () => (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <CustomerAvatar
          size="xl"
          alt={`user avatar of ${user?.fullName}`}
          imagePath={user?.photo as string}
          text={user?.fullName}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5">{user?.fullName ?? 'Mario Rossi'}</Typography>
      </Grid>
    </Grid>
  );

  const AccountSection = () => {
    const [isNotifiesOn, setNotifiesOn] = useState(true);
    const handleNotifies = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNotifiesOn(event.target.checked);
    };
    return (
      <Grid container spacing={4} direction="column">
        <Grid item xs={12}>
          <MyPaper>
            <List disablePadding>
              <ListItem>
                <ListItemText primary={'Edit profile'} />
                <ListItemSecondaryAction onClick={() => history.push(PATHS.CUSTOMER_EDIT)}>
                  <IconButton edge="end" aria-label="edit profile">
                    <ArrowForwardIos fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={'Change password'} />
                <ListItemSecondaryAction onClick={() => history.push(PATHS.CHANGE_PASSWORD)}>
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
                <ListItemText primary={'Notifies'} />
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

export default CustomerSettings;
