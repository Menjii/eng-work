import React, { useState } from 'react';
import {
  Box,
  CSSObject,
  List,
  ListItemButton,
  ListItemIcon,
  styled,
  Theme,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import NavigationButton from './NavigationButton';

import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { getTheme } from '../../../theme/getTheme';

const drawerWidth = 195;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowY: 'visible',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '52px',
  overflowY: 'visible',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const PositionSvgBox = styled(Box)({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '40px',
});

const StyledCircleSvgWrapper = styled(Box)(({ theme }) => ({
  transform: 'translateX(50%)',
  width: '20px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  cursor: 'pointer',
  right: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: 22,
}));

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={createTheme(getTheme('dark'))}>
      <Drawer
        variant='permanent'
        PaperProps={{
          sx: {
            backgroundColor: '#372800',
          },
        }}
        open={open}>
        <DrawerHeader
          sx={{
            padding: 0,
            overflowX: 'hidden',
          }}></DrawerHeader>
        <PositionSvgBox>
          <StyledCircleSvgWrapper onClick={() => setOpen(!open)}>
            {open ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </StyledCircleSvgWrapper>
        </PositionSvgBox>
        <List
          sx={{
            paddingTop: 0,
            overflowX: 'hidden',
          }}>
          <NavigationButton
            icon={<HomeIcon />}
            text='Home'
            isCollapsed={!open}
            to='/'
          />
          <NavigationButton
            icon={<AdminPanelSettingsIcon />}
            text='Admin panel'
            isCollapsed={!open}
            to='/panel'
          />
        </List>
      </Drawer>
    </ThemeProvider>
  );
};
export default Navigation;
