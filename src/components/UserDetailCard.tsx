import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import { Box, Flex, Icon, Image, chakra } from '@chakra-ui/react';

import { UserDetail } from '@/types';
import { formatDateToIDLocaleString } from '@/utils';

const UserDetailCard = ({ user }: { user: UserDetail }) => {
  return (
    <Box
      maxW={'xs'}
      w={'full'}
      mx="auto"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Image
        w="full"
        h={56}
        fit="cover"
        objectPosition="center"
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        alt="avatar"
      />

      <Box pt={4} pb={6} px={6}>
        <chakra.h2
          fontSize="xl"
          fontWeight="bold"
          color="gray.800"
          _dark={{
            color: 'white',
          }}
        >
          {user.name}
        </chakra.h2>

        <Flex
          alignItems="center"
          mt={4}
          color="gray.700"
          _dark={{
            color: 'gray.200',
          }}
        >
          <Icon
            as={user.gender === 'l' ? BsGenderMale : BsGenderFemale}
            h={6}
            w={6}
            mr={2}
          />

          <chakra.h2 px={2} fontSize="sm">
            {user.gender === 'l' ? 'Laki-laki' : 'Perempuan'}
          </chakra.h2>
        </Flex>

        <Flex
          alignItems="center"
          mt={4}
          color="gray.700"
          _dark={{
            color: 'gray.200',
          }}
        >
          <Icon as={FaBirthdayCake} h={6} w={6} mr={2} />

          <chakra.h2 px={2} fontSize="sm">
            {formatDateToIDLocaleString(user.born_date)}
          </chakra.h2>
        </Flex>

        <Flex
          alignItems="center"
          mt={4}
          color="gray.700"
          _dark={{
            color: 'gray.200',
          }}
        >
          <Icon as={MdLocationOn} h={6} w={6} mr={2} />

          <chakra.h2 px={2} fontSize="sm">
            {user.address}
          </chakra.h2>
        </Flex>
      </Box>
    </Box>
  );
};

export default UserDetailCard;
