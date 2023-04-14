import { FormControlProps, FormLabel, InputProps } from '@chakra-ui/react';
import React from 'react';
import { RegisterOptions } from 'react-hook-form';

import XFormControl from './XFormControl';
import XFormErrorMessage from './XFormErrorMessage';
import XInput from './XInput';

const XSimpleFormControl: React.FC<
  FormControlProps & {
    name: string;
    registerOptions?: RegisterOptions;
    inputProps?: InputProps;
  }
> = ({ name, label, registerOptions = {}, inputProps = {}, ...props }) => {
  return (
    <XFormControl name={name} {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      <XInput registerOptions={registerOptions} {...inputProps} />
      <XFormErrorMessage />
    </XFormControl>
  );
};

export default XSimpleFormControl;
