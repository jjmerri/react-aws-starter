import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function NavMenu({menuLabel, children}: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button style={{textTransform: 'none', fontSize: '14px'}} color='inherit' onClick={handleClick}>
         {menuLabel}
      </Button>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {React.Children.map(children, (child, i) => {
          return <MenuItem onClick={handleClose}>{child}</MenuItem>
        })}
      </Menu>
    </div>
  );
}