import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import baseStyles from '../style/styles';

interface Props {
  title?: string;
  subtitle?: string;
  sections: {
    node: JSX.Element;
    title?: string;
  }[];
}

interface TitleSectionProps {
  title: string;
  seeAllPath?: string;
}

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  sectionTitle: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

const CorePage: React.FC<Props & React.ReactNode> = ({ title, subtitle, sections }) => {
  const classes = useStyles();
  const baseClasses = baseStyles();

  const TitleSection: React.FC<TitleSectionProps> = ({ title, seeAllPath }) => (
    <Grid container className={classes.sectionTitle}>
      <Grid item>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
      </Grid>
      {seeAllPath && (
        <Grid item>
          <Link to={seeAllPath} className={baseClasses.link}>
            See all
          </Link>
        </Grid>
      )}
    </Grid>
  );

  return (
    <Grid container spacing={3} className={classes.root}>
      {title && (
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" component="h2">
              {subtitle}
            </Typography>
          )}
        </Grid>
      )}
      {sections.map((s, i) => (
        <Grid item key={`${s.title}-${i}`} xs={12}>
          <Grid container spacing={1}>
            {s.title && (
              <Grid item xs={12}>
                <TitleSection title={s.title} />
              </Grid>
            )}
            <Grid item xs={12}>
              {s.node}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default CorePage;
