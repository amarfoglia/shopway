import React from 'react';
import { makeStyles, Typography, Box, Theme, IconButton } from '@material-ui/core';
import Image from 'material-ui-image';
import { Skeleton } from '@material-ui/lab';
import MyPaper from './MyPaper';

type Variants = 'fullwidth' | 'fixed';

interface CateogryProps {
  name: string;
  iconPath: string;
  variant?: Variants;
  width?: string;
}

interface StyleProps {
  variant?: Variants;
  width?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  categoryContainer: {
    width: ({ width }) => (width ? width + 20 : '100%'),
    height: ({ width }) => (width ? width + 20 : 'auto'),
    marginRight: (props) => (props.variant === 'fixed' ? theme.spacing(3) : 0),
  },
  button: {
    width: ({ width }) => (width ? width + 20 : '100%'),
    padding: 0,
    '& > span': {
      display: 'block',
    },
  },
  categoryPaper: {
    width: ({ width }) => width ?? 'auto',
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

const CategoryPaper: React.FC<CateogryProps> = ({
  name,
  iconPath,
  variant = 'fullwidth',
  width,
}) => {
  const classes = useStyles({ variant, width });
  return (
    <div className={classes.categoryContainer}>
      <IconButton className={classes.button} aria-label={`filter by ${name} category`}>
        <MyPaper customStyle={classes.categoryPaper}>
          <Box>
            <Image
              src={iconPath}
              alt={`category - ${name}`}
              loading={
                <Skeleton animation="wave" variant="circle" width={'inherit'} height={'inherit'} />
              }
            />
          </Box>
          <Typography variant="body2" className={classes.categoryName}>
            {name}
          </Typography>
        </MyPaper>
      </IconButton>
    </div>
  );
};

export default CategoryPaper;
