import React from 'react';
import { IconButton, Menu, MenuItem, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  id: string;
  label: string;
  items: string[];
  selectedItem: number;
  onChange?: (v: string, index: number) => void;
}

const Popover: React.FC<Props> = ({ Icon, id, label, items, onChange, selectedItem }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    // setSelectedIndex(index);
    onChange?.(items[index], index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls={id} aria-haspopup="true" onClick={handleClick} aria-label={label}>
        {<Icon color={selectedItem >= 0 ? 'primary' : 'inherit'} />}
      </IconButton>
      <Menu
        id={`${label}-menu`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ maxHeight: 350 }}
      >
        {items.map((v, index) => (
          <MenuItem
            key={v}
            selected={index === selectedItem}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {v}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Popover;
