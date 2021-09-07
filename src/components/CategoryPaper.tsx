import React from 'react';
import { makeStyles, Paper, Typography, Box } from '@material-ui/core';
import Image from 'material-ui-image';

interface CateogryProps {
  name: string;
  iconPath: string;
}

const useStyles = makeStyles((theme) => ({
  categoryContainer: {
    width: 90,
    height: 90,
    marginRight: theme.spacing(3),
  },
  categoryPaper: {
    padding: theme.spacing(2),
    boxShadow: '0 5px 5px rgb(0 37 132 / 6%)',
    borderRadius: 16,
    width: 70,
    textAlign: 'center',
    '& .MuiBox-root': {
      width: 30,
      margin: 'auto',
      paddingBottom: theme.spacing(1),
    },
  },
  categoryName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
}));

const CategoryPaper: React.FC<CateogryProps> = ({ name, iconPath }) => {
  const classes = useStyles();
  return (
    <div className={classes.categoryContainer}>
      <Paper className={classes.categoryPaper}>
        <Box>
          <Image src={iconPath} alt={`category - ${name}`} />
        </Box>
        <Typography variant="body1" className={classes.categoryName}>
          {name}
        </Typography>
      </Paper>
    </div>
  );
};

export default CategoryPaper;
