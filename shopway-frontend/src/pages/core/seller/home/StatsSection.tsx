import React from 'react';
import { Fab, Grid, Hidden, Typography, useTheme } from '@material-ui/core';
import AddOutlined from '@material-ui/icons/AddOutlined';
import DetailPaper from '../../../../components/DetailPaper';
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpwardOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import MyPaper from '../../../../components/MyPaper';
import moment from 'moment';
import Stats from '../../../../model/statistics';
import { useHistory } from 'react-router-dom';
import Routes from '../../../../utils/routes';
import { SkeletonLoader } from '../../../../components/Loader';
import Chart from 'react-apexcharts';

interface Props {
  stats?: Stats;
  isLoading: boolean;
}

const _sum = (x: number, y: number) => x + y;

const StatsSections: React.FC<Props> = ({ stats, isLoading }) => {
  const dates = stats?.salesStore?.flatMap((s) => moment(s._id).format('DD MMM'));
  const profits = stats?.salesStore?.flatMap((s) => s.profit);
  const orders = stats?.salesStore.flatMap((s) => s.numberOfOrders);
  const weeklyProfit = profits?.reduce(_sum, 0);
  const weeklyVisits = stats?.viewsStore?.flatMap((v) => v.numberOfViews).reduce(_sum, 0);
  const history = useHistory();

  const TopStats = () => (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="h3" component="p">
          {stats?.numberOfArticles}{' '}
          <Typography variant="subtitle1" component="span">
            articles
          </Typography>
        </Typography>
      </Grid>
      <Grid item>
        <Fab
          color="primary"
          aria-label="add"
          size="medium"
          onClick={() => history.push(Routes.ARTICLE_FORM)}
        >
          <AddOutlined />
        </Fab>
      </Grid>
    </Grid>
  );

  const theme = useTheme();
  const options = (dates: string[]) => ({
    chart: {
      id: 'profits-chart',
      fontFamily: 'DM Sans, sans-serif',
      stroke: {
        curve: 'smooth',
      },
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories: dates,
    },
    dataLabels: {
      enabled: false,
    },
  });

  const series1 = [
    {
      name: 'profits',
      data: profits,
    },
  ];

  const series2 = [
    {
      name: 'number of orders',
      data: orders,
    },
  ];

  const MainStats = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <MyPaper p={0}>
          {profits && dates && (
            <Chart type="area" options={options(dates)} series={series1} height={300} />
          )}
        </MyPaper>
        {isLoading && !profits && <SkeletonLoader />}
      </Grid>
      <Hidden xsDown>
        <Grid item xs={12} sm={6}>
          <MyPaper p={0}>
            {orders && dates && (
              <Chart type="bar" options={options(dates)} series={series2} height={300} />
            )}
          </MyPaper>
          {isLoading && !profits && <SkeletonLoader />}
        </Grid>
      </Hidden>
      <Grid item xs={6}>
        <DetailPaper
          title={'Profits per day'}
          value={weeklyProfit ?? 0}
          Icon={ArrowUpwardOutlined}
          iconColor="success"
        />
      </Grid>
      <Grid item xs={6}>
        <DetailPaper title={'Weekly visits'} value={weeklyVisits ?? 0} Icon={VisibilityOutlined} />
      </Grid>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopStats />
      </Grid>
      <Grid item xs={12}>
        <MainStats />
      </Grid>
    </Grid>
  );
};

export default StatsSections;
