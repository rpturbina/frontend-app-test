import * as React from 'react';

import { Box, Container } from '@chakra-ui/react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container as={'section'} mx={'auto'} maxW={'1100px'}>
        <Box minH={'100vh'}>{children}</Box>
      </Container>
    </>
  );
};

export default DashboardLayout;
