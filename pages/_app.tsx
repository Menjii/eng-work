import { Box, Container, styled, ThemeProvider, useTheme } from '@mui/material';
import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginLeft: 0,
  maxWidth: 880,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

export default function App({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  return (
    <Layout>
      <Box component='main' sx={{ flexGrow: 1 }}>
        <StyledContainer sx={{ py: 3 }} maxWidth={false}>
          <Component {...pageProps} />
        </StyledContainer>
      </Box>
    </Layout>
  );
}
