import React, { useState, useEffect } from 'react';
import {
  Box,
  CSSObject,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  styled,
  Theme,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { getTheme } from '../../../theme/getTheme';
import NavigationButton from './NavigationButton';

import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoDevIcon from '@mui/icons-material/LogoDev';

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
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader
          sx={{
            padding: 0,
            overflowX: 'hidden',
          }}>
          <List>
            <ListItemButton
              disabled
              sx={{
                height: '100%',
                justifyContent: open ? 'initial' : 'center',
                '&.Mui-disabled': {
                  opacity: 1,
                },
              }}>
              <StyledListItemIcon>
                <LogoDevIcon />
              </StyledListItemIcon>
              <ListItemIcon
                sx={{
                  opacity: open ? 1 : 0,
                }}>
                <LogoDevIcon />
              </ListItemIcon>
            </ListItemButton>
          </List>
        </DrawerHeader>
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
