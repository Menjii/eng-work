import { Box } from '@mui/material';
import { getTheme } from '../../theme/getTheme';
import Navigation from './Navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ThemeProvider theme={createTheme(getTheme('light'))}>
        <Navigation />
        <main
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
          {children}
        </main>
      </ThemeProvider>
    </Box>
  );
};

export default Layout;
