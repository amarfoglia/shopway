import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import MyPaper from './MyPaper';

interface Props {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
}

const DetailPaper: React.FC<Props> = ({ title, value, icon, subValue }) => (
  <MyPaper style={{ padding: 10 }}>
    <Typography variant="body2" component="h6">
      {title}
    </Typography>
    <Grid item container spacing={1} alignItems="flex-end">
      <Grid item>{icon}</Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6" component="p">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{subValue}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </MyPaper>
);

export default DetailPaper;
