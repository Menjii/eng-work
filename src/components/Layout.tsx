import { Box, ThemeProvider, useTheme } from '@mui/material';
import Navigation from './Navigation';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <main>{children}</main>
      </ThemeProvider>
    </Box>
  );
};

export default Layout;
