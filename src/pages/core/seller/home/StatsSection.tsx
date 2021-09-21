import React from 'react';
import { Fab, Grid, Typography } from '@material-ui/core';
import AddOutlined from '@material-ui/icons/AddOutlined';
import { Line } from 'react-chartjs-2';
import DetailPaper from '../../../../components/DetailPaper';
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpwardOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import MyPaper from '../../../../components/MyPaper';
import moment from 'moment';
import Skeleton from '@material-ui/lab/Skeleton';

interface Props {
  stats?: {
    _id: string;
    numberOfOrders: number;
    profit: number;
  }[];
}

const StatsSections: React.FC<Props> = ({ stats = [] }) => {
  const dates = stats?.flatMap((s) => moment(s._id).format('DD MMM'));
  const profits = stats?.flatMap((s) => s.profit);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = () => {
    return {
      labels: dates,
      datasets: [
        {
          lineTension: 0.6,
          borderColor: '#4f52ff',
          pointBackgroundColor: '#fff',
          pointBorderColor: '#4f52ff',
          pointHoverBackgroundColor: '#4f52ff',
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 4,
          fill: false,
          label: 'Profit per day',
          data: profits,
        },
      ],
    };
  };

  const TopStats = () => (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="h3" component="p">
          84{' '}
          <Typography variant="subtitle1" component="span">
            articles
          </Typography>
        </Typography>
      </Grid>
      <Grid item>
        <Fab color="primary" aria-label="add" size="medium">
          <AddOutlined />
        </Fab>
      </Grid>
    </Grid>
  );

  const MainStats = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MyPaper>
          {profits.length > 0 ? (
            <Line data={data} height={220} options={options} />
          ) : (
            <Skeleton variant="rect" width={'100%'} height={118} />
          )}
        </MyPaper>
      </Grid>
      <Grid item xs={6}>
        <DetailPaper
          title={'Profits per day'}
          value={`12`}
          icon={<ArrowUpwardOutlined fontSize="small" />}
        />
      </Grid>
      <Grid item xs={6}>
        <DetailPaper
          title={'Weekly visits'}
          value={`30`}
          icon={<VisibilityOutlined fontSize="small" />}
        />
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
