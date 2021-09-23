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
import Stats from '../../../../model/statistics';
import { useHistory } from 'react-router-dom';
import PATHS from '../../../../utils/routes';

interface Props {
  stats?: Stats;
}

const computeAvgProfit = (total?: number, num?: number) =>
  total && num && total > 0 && num > 0 ? total / num : 0;

const _sum = (x: number, y: number) => x + y;

const StatsSections: React.FC<Props> = ({ stats }) => {
  const dates = stats?.salesStore?.flatMap((s) => moment(s._id).format('DD MMM'));
  const profits = stats?.salesStore?.flatMap((s) => s.profit);
  const weeklyProfit = profits?.reduce(_sum, 0);
  const weeklyVisits = stats?.viewsStore?.flatMap((v) => v.numberOfViews).reduce(_sum, 0);
  const weeklyOrders = stats?.salesStore?.flatMap((s) => s.numberOfOrders).reduce(_sum, 0);
  const history = useHistory();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const _prepareData = (labels: string[], data: number[]) => {
    return {
      labels,
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
          data,
        },
      ],
    };
  };

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
          onClick={() => history.push(PATHS.ARTICLE_FORM)}
        >
          <AddOutlined />
        </Fab>
      </Grid>
    </Grid>
  );

  const MainStats = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MyPaper>
          {profits && dates ? (
            <Line
              data={_prepareData(dates, profits)}
              height={220}
              options={options}
              redraw={false}
            />
          ) : (
            <Skeleton variant="rect" width={'100%'} height={118} />
          )}
        </MyPaper>
      </Grid>
      <Grid item xs={6}>
        <DetailPaper
          title={'Profits per day'}
          value={computeAvgProfit(weeklyProfit, weeklyOrders)}
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
