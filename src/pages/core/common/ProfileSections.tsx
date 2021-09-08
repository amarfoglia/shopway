import React from 'react';
import { Grid, Typography } from '@material-ui/core';
// import RoomOutlined from '@material-ui/icons/RoomOutlined';
// import PhoneOutlined from '@material-ui/icons/PhoneOutlined';
import MyAvatar from '../../../components/MyAvatar';

interface Props {
  title: string;
  subtitle1?: string;
  subtitle2?: string;
  imagePath?: string;
}

const ProfileSection: React.FC<Props> = ({ title, subtitle1, subtitle2, imagePath }) => (
  <Grid container direction="column" alignItems="center" spacing={1}>
    <Grid item xs={12}>
      <MyAvatar size="xl" alt={`avatar of ${title}`} text={title} imagePath={imagePath} />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h5">{title}</Typography>
    </Grid>
    {subtitle1 && (
      <Grid item xs={12}>
        <Typography variant="body1">
          {/* <RoomOutlined fontSize="small" /> */}
          {subtitle1}
        </Typography>
      </Grid>
    )}
    {subtitle2 && (
      <Grid item>
        <Typography variant="body2">
          {/* <PhoneOutlined fontSize="small" /> */}
          {subtitle2}
        </Typography>
      </Grid>
    )}
  </Grid>
);

export default ProfileSection;
