import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import AddOutlined from '@material-ui/icons/AddOutlined';

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    marginBottom: 72 + theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

interface Props {
  handleClick: () => void;
}

const BottomFab: React.FC<Props> = ({ handleClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.addButton}>
      <Fab color="primary" aria-label="add" size="medium" onClick={handleClick}>
        <AddOutlined />
      </Fab>
    </div>
  );
};

export default BottomFab;
