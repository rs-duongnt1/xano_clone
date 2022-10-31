import { Header } from './header';
import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Stack>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Stack>
  );
};
