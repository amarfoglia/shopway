import React from 'react';
import Chart from 'react-apexcharts';
import { getTimeLeft } from '../utils/time';

interface Value {
  label: string;
  startDate: Date;
  endDate: Date;
}

interface Props {
  values: Value[];
}

const TimeLine: React.FC<Props> = ({ values }) => {
  const series = values.flatMap((v) => {
    const hoursLeft = getTimeLeft(v.endDate).asHours();
    return hoursLeft > 0 ? Math.floor((hoursLeft / 26) * 100) : 0;
  });

  const options = {
    chart: {
      id: 'profits-chart',
      fontFamily: 'DM Sans, sans-serif',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    // colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
    labels: values.flatMap((v) => v.label),
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (seriesName: any, opts: any) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="radialBar" height={390} />;
};

export default TimeLine;
