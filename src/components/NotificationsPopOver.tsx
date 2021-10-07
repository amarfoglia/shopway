import React, { useContext } from 'react';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import IconButton from '@material-ui/core/IconButton';
import NotifierContext from '../hooks/useNotifier';
import AuthContext from '../hooks/useAuth';
import moment from 'moment';
import { jsonClient, Payload } from '../utils/axiosClient';
import { useMutation } from 'react-query';
import { AppError } from '../model/http';
import Notification from '../model/notification';
import { useTheme } from '@material-ui/core';

const readNotification = (id: string) =>
  jsonClient.patch<void, Payload<Notification>>(`/users/notifications/${id}`).then((res) => res);

const NotificationsPopOver: React.FC = () => {
  const { notifications, markNotification } = useContext(NotifierContext);
  const { user } = useContext(AuthContext);
  const theme = useTheme();

  const { mutate: _readNotification } = useMutation<Payload<Notification>, AppError, string>(
    'readNotification',
    readNotification,
    { onSuccess: ({ data }) => data && markNotification(data.notification._id) },
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;
  const toBeRead =
    notifications.length -
    notifications.flatMap((n) => n.readBy).filter((r) => r.user === user?._id).length;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge color="error" overlap="circular" aria-describedby={id} badgeContent={toBeRead}>
          <NotificationsOutlined fontSize="large" />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List component="nav" aria-label="notifications list" style={{ maxWidth: 300 }}>
          {notifications.length > 0 ? (
            notifications.map((n, i) => (
              <React.Fragment key={n._id}>
                <ListItem
                  onClick={() => _readNotification(n._id)}
                  button
                  style={{
                    backgroundColor: n.readBy.find((r) => r.user === user?._id)
                      ? 'inherit'
                      : theme.palette.secondary.main,
                  }}
                >
                  <Grid container style={{ display: 'flex' }}>
                    <Grid item xs={12}>
                      <Grid container alignItems="baseline" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="body1">
                            <strong>{n.heading}</strong>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption">
                            {moment(n.createdAt).format('hh:mm A, DD-mm-yyyy')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">{n.content}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {i < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <Typography variant="body1">There&apos;s not notifcations</Typography>
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
};

export default NotificationsPopOver;
