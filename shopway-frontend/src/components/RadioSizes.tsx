import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { Box, FormLabel, makeStyles, Theme } from '@material-ui/core';

type Size = {
  value: string;
  disabled?: boolean;
};

interface Props {
  sizes: Size[];
  selectedSize: string;
  handleSizeChange?: (c: string) => void;
}

interface StyleProps {
  checked?: boolean;
}

const spanStyles = makeStyles<Theme, StyleProps>((theme) => ({
  icon: {
    fontSize: theme.spacing(2),
    height: theme.spacing(4),
    width: theme.spacing(4),
    borderRadius: 30,
    backgroundColor: 'white',
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    border: (props) => `1px solid ${props.checked ? theme.palette.primary.main : 'grey'}`,
  },
  span: {
    width: '100%',
    textAlign: 'center',
    color: (props) => (props.checked ? theme.palette.primary.main : 'black'),
  },
}));

const useStyles = makeStyles<Theme>((theme) => ({
  legend: {
    color: 'black !important',
    marginBottom: theme.spacing(1),
  },
}));

interface ItemProps {
  value: string;
  checked?: boolean;
}

const SizeIcon: React.FC<ItemProps> = ({ value, checked = false }) => {
  const classes = spanStyles({ checked });
  return (
    <Box className={classes.icon}>
      <span className={classes.span}>{value}</span>
    </Box>
  );
};

export { SizeIcon };

const RadioSizes: React.FC<Props> = ({ sizes, handleSizeChange, selectedSize }) => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSizeChange?.((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className={classes.legend} disabled>
        Item size
      </FormLabel>
      <RadioGroup aria-label="size" name="size" value={selectedSize} onChange={handleChange} row>
        {sizes.map(({ value, disabled }) => (
          <Radio
            icon={<SizeIcon value={value} />}
            checkedIcon={<SizeIcon value={value} checked />}
            key={value}
            value={value}
            name={`radio-${value}`}
            inputProps={{ 'aria-label': `color ${value}` }}
            style={{ paddingLeft: 0 }}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioSizes;
