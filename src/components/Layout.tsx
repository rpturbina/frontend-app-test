import * as React from 'react';

import { Container, Flex } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container as={'section'} mx={'auto'} maxW={'1100px'}>
      <Flex minH={'100vh'} align={'center'} justify={'center'}>
        {children}
      </Flex>
    </Container>
  );
};

export default Layout;
