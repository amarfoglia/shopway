import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { Box, FormLabel, makeStyles, Theme } from '@material-ui/core';
import CheckOutlined from '@material-ui/icons/CheckOutlined';

interface Props {
  colors: string[];
  selectedColor: string;
  handleColorChange?: (c: string) => void;
}

interface ItemProps {
  color: string;
  checked?: boolean;
}

const useStyles = makeStyles<Theme>((theme) => ({
  legend: {
    color: 'black !important',
    marginBottom: theme.spacing(1),
  },
}));

const spanStyles = makeStyles<Theme, ItemProps>((theme) => ({
  icon: {
    fontSize: theme.spacing(2),
    height: (props) => `calc(${theme.spacing(4)}px - ${props.checked ? 2 : 0}px)`,
    width: (props) => `calc(${theme.spacing(4)}px - ${props.checked ? 2 : 0}px)`,
    borderRadius: 30,
    backgroundColor: (props) => props.color,
    border: (props) => (props.checked ? `2px solid ${theme.palette.primary.main}` : ''),
  },
  span: {
    display: 'inline-grid',
    verticalAlign: '-webkit-baseline-middle',
    color: (props) => (props.checked ? theme.palette.primary.main : 'black'),
  },
}));

const ColorIcon: React.FC<ItemProps> = ({ color, checked = false }) => {
  const classes = spanStyles({ color, checked });
  return (
    <Box className={classes.icon}>
      <span className={classes.span}>{checked ? <CheckOutlined /> : ''}</span>
    </Box>
  );
};

const RadioColors: React.FC<Props> = ({ colors, handleColorChange, selectedColor }) => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleColorChange?.((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className={classes.legend} disabled>
        Item color
      </FormLabel>
      <RadioGroup aria-label="color" name="color" value={selectedColor} onChange={handleChange} row>
        {colors.map((c) => (
          <Radio
            icon={<ColorIcon color={c} />}
            checkedIcon={<ColorIcon color={c} checked />}
            key={c}
            value={c}
            name={`radio-${c}`}
            inputProps={{ 'aria-label': `color ${c}` }}
            style={{ paddingLeft: 0 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioColors;
