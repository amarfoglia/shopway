import React from 'react';
import { IconButton, Menu, MenuItem, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  CustomNode?: React.ReactNode;
  id: string;
  label: string;
  items: {
    label: string;
    value: string;
  }[];
  selectedItem?: number;
  onChange?: (v: string, index: number) => void;
}

const MenuPopOver: React.FC<Props> = ({
  Icon,
  CustomNode,
  id,
  label,
  items,
  onChange,
  selectedItem = -1,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    onChange?.(items[index].value, index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls={id} aria-haspopup="true" onClick={handleClick} aria-label={label}>
        {Icon && <Icon color={selectedItem > 0 ? 'primary' : 'inherit'} />}
        {CustomNode}
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
            key={v.label}
            selected={index === selectedItem}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {v.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuPopOver;
