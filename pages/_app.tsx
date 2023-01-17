import { Box, Container, styled, ThemeProvider, useTheme } from '@mui/material';
import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

export default function App({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  return (
    <Layout>
      <Box component='main' sx={{ flexGrow: 1, width: '100%' }}>
        <StyledContainer sx={{ py: 3, width: '100%' }}>
          <Component {...pageProps} />
        </StyledContainer>
      </Box>
    </Layout>
  );
}
