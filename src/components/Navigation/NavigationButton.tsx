import React, { MouseEventHandler, ReactNode } from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import { useRouter } from 'next/router';

interface NavigationButtonProps {
  icon: ReactNode;
  text: string;
  isCollapsed: boolean;
  to: string;
  isSubMenuSelected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: 40,
}));

const IndicationBar = styled('div')(({ theme }) => ({
  position: 'absolute' as const,
  background: theme.palette.primary.main,
  width: 4,
  height: '100%',
  left: 0,
}));

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  text,
  isCollapsed,
  to,
  isSubMenuSelected,
  onClick,
}: NavigationButtonProps) => {
  const router = useRouter();
  return (
    <ListItemButton
      selected={isSubMenuSelected ?? false}
      key={text}
      onClick={onClick ? onClick : () => router.push(to ?? '../')}>
      {<IndicationBar />}
      <StyledListItemIcon>{icon}</StyledListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          fontWeight: 600,
        }}
        sx={{
          overflow: 'hidden',
          opacity: isCollapsed ? 0 : 1,
        }}
      />
    </ListItemButton>
  );
};
export default NavigationButton;
