import { EditIcon } from '@chakra-ui/icons';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	chakra,
	useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const ChakraPoweredDatePicker = chakra(DatePicker);

type EditUserFormValues = {
	name: string;
	address: string;
	gender: 'Pria' | 'Wanita';
	birthDate: Date;
};

type EditUserModalProps = {
	initialValues: EditUserFormValues;
};

const EditUserModal = ({ initialValues }: EditUserModalProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit, formState, reset, control } =
		useForm<EditUserFormValues>({ defaultValues: initialValues });

	const initialRef = React.useRef<HTMLInputElement | null>(null);
	const finalRef = React.useRef(null);

	const { ref, ...rest } = register('name', { required: true });

	const onSubmit: SubmitHandler<EditUserFormValues> = data => {
		console.log(data);
		onClose();
		reset();
	};

	return (
		<>
			<IconButton
				variant={'outline'}
				icon={<EditIcon />}
				aria-label="Edit user"
				colorScheme="blue"
				size={'sm'}
				border={'none'}
				onClick={onOpen}
			/>

			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent as={'form'} onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Edit user</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl isInvalid={!!formState.errors.name}>
							<FormLabel htmlFor="name">Nama</FormLabel>
							<Input
								id="name"
								type="text"
								{...rest}
								ref={e => {
									ref(e);
									initialRef.current = e;
								}}
							/>
							<FormErrorMessage>Kolom nama harus diisi</FormErrorMessage>
						</FormControl>

						<FormControl mt={4} isInvalid={!!formState.errors.address}>
							<FormLabel htmlFor="address">Alamat</FormLabel>
							<Input
								id="address"
								type="text"
								{...register('address', { required: true })}
							/>
							<FormErrorMessage>Kolom alamat harus diisi</FormErrorMessage>
						</FormControl>

						<FormControl
							as="fieldset"
							mt={4}
							isInvalid={!!formState.errors.gender}
						>
							<FormLabel as="legend">P / W</FormLabel>
							<Controller
								name="gender"
								control={control}
								defaultValue="Pria"
								render={({ field }) => (
									<RadioGroup value={field.value} onChange={field.onChange}>
										<HStack spacing="24px">
											<Radio value="Pria">Pria</Radio>
											<Radio value="Wanita">Wanita</Radio>
										</HStack>
									</RadioGroup>
								)}
							/>
							<FormErrorMessage>Pilih jenis kelamin</FormErrorMessage>
						</FormControl>

						<FormControl mt={4} isInvalid={!!formState.errors.birthDate}>
							<FormLabel>Tanggal lahir</FormLabel>
							<Controller
								name="birthDate"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<ChakraPoweredDatePicker
										display="block"
										borderRadius="md"
										dateFormat="dd/MM/yyyy"
										px={4}
										py={2}
										borderColor="gray.300"
										selected={field.value}
										onChange={field.onChange}
										showYearDropdown
										dropdownMode="select"
									/>
								)}
							/>
							<FormErrorMessage>Pilih tanggal lahir</FormErrorMessage>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							type="submit"
							colorScheme="blue"
							mr={3}
							_hover={{
								transform: 'translateY(-2px)',
								boxShadow: 'lg',
							}}
						>
							Save
						</Button>
						<Button
							onClick={() => {
								onClose();
								reset();
							}}
							_hover={{
								transform: 'translateY(-2px)',
								boxShadow: 'lg',
							}}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditUserModal;
