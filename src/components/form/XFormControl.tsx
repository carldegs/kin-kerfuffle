import { FormControl, FormControlProps } from '@chakra-ui/react';
import { get } from 'lodash';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const XFormControl: React.FC<FormControlProps & { name: string }> = ({
  name,
  children,
  ...props
}) => {
  const { formState } = useFormContext();

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const newProps = { name };
      return React.cloneElement(child, newProps);
    }
    return child;
  });

  return (
    <FormControl isInvalid={!!get(formState.errors, name)} {...props}>
      {childrenWithProps}
    </FormControl>
  );
};

export default XFormControl;
