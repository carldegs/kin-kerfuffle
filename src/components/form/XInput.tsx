import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

type RegisterOptionsKeys = keyof RegisterOptions;

const getErrorMessage = (
  key: RegisterOptionsKeys,
  value: string | number | boolean
) => {
  switch (key as RegisterOptionsKeys) {
    case 'required':
      return 'Field required';
    case 'min':
      return `Field must be at least ${value}`;
    case 'max':
      return `Field must not exceed ${value}`;
    case 'minLength':
      return `Field must be at least ${value} characters`;
    case 'maxLength':
      return `Field must not exceed ${value} characters`;
  }
};

const addDefaultErrorMessages = (
  name: string,
  registerOptions: RegisterOptions = {}
) => {
  const editFields: RegisterOptionsKeys[] = [
    'required',
    'min',
    'max',
    'maxLength',
    'minLength',
  ];

  return Object.fromEntries(
    Object.entries(registerOptions).map(([key, value]) => {
      if (
        editFields.includes(key as RegisterOptionsKeys) &&
        (typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean')
      ) {
        return [
          key,
          {
            value,
            message: getErrorMessage(key as RegisterOptionsKeys, value),
          },
        ];
      }
      return [key, value];
    })
  ) as RegisterOptions;
};

const XInput: React.FC<
  InputProps & {
    name?: string;
    registerOptions?: RegisterOptions;
    useDefaultErrorMessages?: boolean;
  }
> = ({
  registerOptions = {},
  name = '',
  useDefaultErrorMessages = true,
  ...props
}) => {
  const { register } = useFormContext();
  return (
    <Input
      {...props}
      {...register(
        name,
        useDefaultErrorMessages
          ? addDefaultErrorMessages(name, registerOptions)
          : registerOptions
      )}
    />
  );
};

export default XInput;
