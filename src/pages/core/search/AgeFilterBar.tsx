import React, { useState } from 'react';
import { AppBar, Divider, makeStyles, Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles({
  tabs: {
    '& span': {
      textTransform: 'capitalize',
    },
  },
});

type Age = 'man' | 'woman' | 'kid';

interface Props {
  onChange?: (value: string) => void;
}

const AgeFilterBar: React.FC<Props> = ({ onChange }) => {
  const [currentTab, setCurrentTab] = useState<Age>('man');
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = async (event: React.ChangeEvent<{}>, newValue: Age) => {
    onChange?.(newValue);
    setCurrentTab(newValue);
  };

  return (
    <AppBar color="transparent" position="relative" elevation={0}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        aria-label="age-filter-tabs"
        className={classes.tabs}
      >
        <Tab label="Man" value={'man'} />
        <Tab label="Woman" value={'woman'} />
        <Tab label="Kid" value={'kid'} />
      </Tabs>
      <Divider />
    </AppBar>
  );
};

export default AgeFilterBar;
