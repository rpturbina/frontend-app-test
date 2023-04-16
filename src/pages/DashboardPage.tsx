import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import AddUserModal from '@/components/AddUserModal';
import DashboardLayout from '@/components/DashboardLayout';
import UserTable from '@/components/UserTable';
import { User } from '@/types';

const users: User[] = [
	{
		name: 'Asep',
		address: 'Nagrek',
		gender: 'Pria',
		birthDate: '23 May 1990',
		createdAt: '26 Jan 2023 11:04',
	},
	{
		name: 'Septian',
		address: 'Bandung',
		gender: 'Pria',
		birthDate: '28 September 1990',
		createdAt: '28 Jan 2023 12:22',
	},
];

const DashboardPage = () => {
	return (
		<DashboardLayout>
			<Box bg={'white'} borderRadius={'lg'} p={6} boxShadow={'md'}>
				<Flex justify={'space-between'} align={'center'} columnGap={2}>
					<Heading as={'h2'} size={['sm', 'md']}>
						Users Table
					</Heading>
					<AddUserModal />
				</Flex>
				<UserTable users={users} />
			</Box>
		</DashboardLayout>
	);
};

export default DashboardPage;
