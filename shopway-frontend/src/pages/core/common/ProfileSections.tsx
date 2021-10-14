import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import MyAvatar from '../../../components/MyAvatar';

type Subject = 'store' | 'user';

interface Props {
  title?: string;
  subtitle1?: string;
  subtitle2?: string;
  imagePath?: string;
  subject: Subject;
}

const ProfileSection: React.FC<Props> = ({ title, subtitle1, subtitle2, imagePath, subject }) => (
  <Grid container direction="column" alignItems="center" spacing={1}>
    {title && (
      <Grid item xs={12}>
        <MyAvatar
          size="xl"
          alt={`avatar of ${title}`}
          text={title}
          imagePath={imagePath}
          subject={subject}
        />
      </Grid>
    )}
    <Grid item xs={12}>
      <Typography variant="h5">{title}</Typography>
    </Grid>
    {subtitle1 && (
      <Grid item xs={12}>
        <Typography variant="body1">{subtitle1}</Typography>
      </Grid>
    )}
    {subtitle2 && (
      <Grid item>
        <Typography variant="body2">{subtitle2}</Typography>
      </Grid>
    )}
  </Grid>
);

export default ProfileSection;
