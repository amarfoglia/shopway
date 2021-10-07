import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    ticket: {
      textAlign: 'center',
      padding: theme.spacing(2),
      width: 220,
      height: 260,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(2, 2, 0, 0),
    },
    main: {
      height: 180,
      display: 'inline-grid',
    },
    hole: {
      borderRadius: '50%',
      left: -30,
      marginRight: 10,
      display: 'inline-block',
      position: 'relative',
    },
    middleHole: {
      backgroundColor: theme.palette.background.default,
      width: 7.5,
      height: 7.5,
    },
    borderHole: {
      backgroundColor: theme.palette.background.default,
      width: 30,
      height: 30,
    },
    ticketSeparator: {
      display: 'inline-flex',
      alignContent: 'center',
      alignItems: 'center',
    },
  }),
);

interface TicketProps {
  code: string;
  subInfo: string;
  validFrom: Date;
  validTo: Date;
}

const TicketVisualizer: React.FC<TicketProps> = ({ code, subInfo, validFrom, validTo }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.modal}>
      <div className={classes.ticket}>
        <div className={classes.main}>
          <Typography variant="h5" style={{ margin: 'auto' }}>
            {subInfo}
          </Typography>
          <Typography id="order-ticket-code" variant="h4" style={{ color: 'white' }}>
            {code.split('-')[1]}
          </Typography>
        </div>

        <div className={classes.ticketSeparator}>
          <span className={clsx(classes.hole, classes.borderHole)}></span>
          {Array(12)
            .fill(0)
            .map((v, i) => (
              <span key={`dot-${i}`} className={clsx(classes.hole, classes.middleHole)}></span>
            ))}
          <span className={clsx(classes.hole, classes.borderHole)}></span>
        </div>

        <Typography id="order-ticket-validity" variant="h6">
          {moment(validFrom).format('D MMM')} - {moment(validTo).format('D MMM')}
        </Typography>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <ConfirmationNumber titleAccess="show ticket info" color="primary" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="order-ticket-code"
        aria-describedby="order-ticket-validity"
      >
        {body}
      </Modal>
    </div>
  );
};

export default TicketVisualizer;
