import { FormErrorMessage, FormErrorMessageProps } from '@chakra-ui/react';
import get from 'lodash/get';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const XFormErrorMessage: React.FC<
  FormErrorMessageProps & { name?: string }
> = ({ name = '', ...props }) => {
  const { formState } = useFormContext();

  return (
    <FormErrorMessage {...props}>
      {(get(formState.errors, name)?.message as string) || ''}
    </FormErrorMessage>
  );
};

export default XFormErrorMessage;
