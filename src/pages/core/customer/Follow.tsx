import React, { useContext } from 'react';
import {
  // makeStyles,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import CorePage from '../../../components/CorePage';
import AuthContext from '../../../hooks/useAuth';
import { BACKEND_URL, jsonClient, Payload } from '../../../utils/axiosClient';
import { useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import Store from '../../../model/users/store';
import MyAvatar from '../../../components/MyAvatar';
import PATHS from '../../../utils/routes';
import { useHistory } from 'react-router-dom';
import MyPaper from '../../../components/MyPaper';

// const useStyles = makeStyles((theme) => ({
//   followContainer: {
//     boxShadow: '0 0 15px 2px #efefef',
//     borderRadius: theme.spacing(2),
//     textAlign: 'center',
//     '& #follow-see-all-link': {
//       padding: theme.spacing(1),
//     },
//   },
//   followRow: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// }));

const getFollowedStores = (id?: string) =>
  jsonClient.get<void, Payload<Store[]>>(`/users/${id}/stores`).then((res) => res);

const CustomerFollow = (): React.ReactElement => {
  // const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const { data } = useQuery<Payload<Store[]>, AppError>(['getFollowedStores', user?._id], () =>
    getFollowedStores(user?._id),
  );

  const followedStores = data?.data?.store;
  const goToStorePage = (storeId: string) => history.push(PATHS.STORE_PAGE.replace(':id', storeId));

  const FollowedStoresSection = () => (
    <MyPaper>
      <List dense>
        {followedStores?.map((s) => (
          <ListItem key={s._id}>
            <ListItemAvatar>
              <MyAvatar
                alt="Store logo"
                imagePath={`${BACKEND_URL}/img/logos/${s.logo}`}
                size="medium"
                handleClick={() => goToStorePage(s._id)}
              />
            </ListItemAvatar>
            <ListItemText primary={s.name} secondary={s.address} />
            <ListItemSecondaryAction>
              <FavoriteOutlined color="primary" />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {/* <Divider variant="middle" /> */}
      {/* <Box id={'follow-see-all-link'}>
        <Link>See all</Link>
      </Box> */}
    </MyPaper>
  );

  const sections = [{ node: <FollowedStoresSection /> }];

  return <CorePage title="Followed" sections={sections} />;
};

export default CustomerFollow;
