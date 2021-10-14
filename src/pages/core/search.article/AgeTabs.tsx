import React, { useState } from 'react';
import { AppBar, Divider, makeStyles, Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles({
  tabs: {
    '& span': {
      textTransform: 'capitalize',
    },
  },
});

type Age = 'Man' | 'Woman' | 'Kid';

interface Props {
  onChange?: (value: string) => void;
}

const AgeFilterBar: React.FC<Props> = ({ onChange }) => {
  const [currentTab, setCurrentTab] = useState<Age>('Man');
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
        <Tab label="Man" value={'Man'} />
        <Tab label="Woman" value={'Woman'} />
        <Tab label="Kid" value={'Kid'} />
      </Tabs>
      <Divider />
    </AppBar>
  );
};

export default AgeFilterBar;
