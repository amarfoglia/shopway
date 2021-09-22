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
  <MyPaper p={10}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" component="h6">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid item container spacing={1} alignItems="center" style={{ display: 'flex' }}>
          <Grid item>{icon}</Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="h5" component="p">
                  <b>{value}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{subValue}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </MyPaper>
);

export default DetailPaper;
