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
})(({}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Navigation = () => {
  return (
    <ThemeProvider theme={createTheme(getTheme('dark'))}>
      <Drawer
        variant='permanent'
        PaperProps={{
          sx: {
            backgroundColor: '#372800',
          },
        }}
        open={true}>
        <DrawerHeader
          sx={{
            padding: 0,
            overflowX: 'hidden',
          }}></DrawerHeader>
        <List
          sx={{
            paddingTop: 0,
            overflowX: 'hidden',
          }}>
          <NavigationButton
            icon={<HomeIcon />}
            text='Home'
            isCollapsed={false}
            to='/'
          />
          <NavigationButton
            icon={<AdminPanelSettingsIcon />}
            text='Admin panel'
            isCollapsed={false}
            to='/panel'
          />
        </List>
      </Drawer>
    </ThemeProvider>
  );
};
export default Navigation;
