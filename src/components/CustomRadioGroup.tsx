import { RegisterOptions, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

type RadioGroupValue = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  label: string;
  id: string;
  defaultValue: RadioGroupValue['value'];
  options: RadioGroupValue[];
  validation?: RegisterOptions;
};

const CustomRadioGroup = ({
  label,
  id,
  defaultValue,
  options,
  validation,
}: RadioGroupProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl as="fieldset" mt={4} isInvalid={!!errors[id]} id={id}>
      <FormLabel as="legend">{label}</FormLabel>
      <RadioGroup defaultValue={defaultValue}>
        <HStack spacing="24px">
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              {...register(id, validation)}
            >
              {option.label}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
      {errors[id] && (
        <FormErrorMessage>{errors[id]?.message?.toString()}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomRadioGroup;
