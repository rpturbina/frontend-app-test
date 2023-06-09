import * as React from 'react';

import { Box, Container } from '@chakra-ui/react';

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Container as={'section'} mx={'auto'} maxW={'1100px'}>
        <Box minH={'100vh'} py={8}>
          {children}
        </Box>
      </Container>
    </>
  );
};

export default DashboardLayout;
