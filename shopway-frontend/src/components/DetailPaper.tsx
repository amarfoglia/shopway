import React from 'react';
import { Grid, makeStyles, SvgIconTypeMap, Typography } from '@material-ui/core';
import MyPaper from './MyPaper';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  successIcon: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
  infoIcon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  warningIcon: {
    backgroundColor: theme.palette.warning.light,
    color: 'black',
  },
  roundedIcon: {
    borderRadius: 30,
    padding: theme.spacing(1),
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-types
type Svg = OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
type SvgColor = 'info' | 'warning' | 'success';

interface Props {
  title: string;
  value: string | number;
  subValue?: string;
  iconColor?: SvgColor;
  Icon: Svg;
}

const DetailPaper: React.FC<Props> = ({ title, value, Icon, subValue, iconColor = 'info' }) => {
  const classes = useStyles();
  const colorStyle =
    iconColor === 'warning'
      ? classes.warningIcon
      : iconColor === 'success'
      ? classes.successIcon
      : classes.infoIcon;
  return (
    <MyPaper p={10}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" component="h6">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item container spacing={1} alignItems="center" style={{ display: 'flex' }}>
            <Grid item>
              {<Icon fontSize="medium" className={clsx(classes.roundedIcon, colorStyle)} />}
            </Grid>
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
};

export default DetailPaper;
