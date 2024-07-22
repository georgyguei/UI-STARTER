import { cn } from '@/lib/utils';
import { Children, cloneElement, isValidElement } from 'react';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';
import FormRequiredIndicator from './indicator';

export type FormControlProps = {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};

/**
 * Form Control is a wrapper component that provides context and functionality to form elements.
 *
 * @example
 * <FormControl isInvalid={error}>
 *  ...
 * </FormControl>
 *
 * @param props - The props of the FormControl component.
 * @returns The FormControl component.
 */
const FormControl: UIComponent<'div', FormControlProps> = props => {
  const { isInvalid, isRequired, className, children, ...rest } = props;

  const formRequiredIndicatorElement = isRequired
    ? Children.toArray(children).find(child => {
        if (isValidElement(child)) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          return (child as any).type.displayName === 'FormRequiredIndicator';
        }
      }) || <FormRequiredIndicator>*</FormRequiredIndicator>
    : undefined;

  const formElements = isRequired
    ? Children.map(children, child => {
        if (isValidElement(child)) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          switch ((child as any).type.displayName) {
            case 'FormLabel':
              return cloneElement(child as React.ReactElement, {
                isRequired: isRequired,
                requiredIndicator: formRequiredIndicatorElement,
              });
            case 'FormRequiredIndicator':
              return null;
          }
        }
        return child;
      })
    : children;

  return (
    <Box
      className={cn('relative w-full', className)}
      role="group"
      data-invalid={isInvalid}
      {...rest}
    >
      {formElements}
    </Box>
  );
};

FormControl.displayName = 'FormControl';

export default FormControl;
