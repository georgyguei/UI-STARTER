import { cn } from '@/lib/utils';
import { Children, cloneElement, isValidElement } from 'react';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';
import FormRequiredIndicator from './indicator';

const generateNumberIdTwoDigits = (arg0: string) => {
  const randomNumber = Math.floor(Math.random() * 100);
  const twoDigitNumber = randomNumber.toString().padStart(2, '0');
  return arg0 + twoDigitNumber;
};

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
  const {
    isInvalid,
    isRequired,
    isDisabled,
    isReadOnly,
    className,
    children,
    ...rest
  } = props;

  const formId = generateNumberIdTwoDigits('field-:r');

  const formHelpTextElement = Children.map(children, child => {
    if (
      isValidElement(child) &&
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (child as any).type.displayName === 'FormHelpText'
    ) {
      return cloneElement(child as React.ReactElement, {
        id: `${formId}-help-text`,
      });
    }
  });

  const formErrorMessageElement = isInvalid
    ? Children.map(children, child => {
        if (
          isValidElement(child) &&
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (child as any).type.displayName === 'FormErrorMessage'
        ) {
          return cloneElement(child as React.ReactElement, {
            id: `${formId}-feedback`,
          });
        }
      })
    : undefined;

  const formRequiredIndicatorElement = isRequired
    ? Children.toArray(children).find(child => {
        if (isValidElement(child)) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          return (child as any).type.displayName === 'FormRequiredIndicator';
        }
      }) || <FormRequiredIndicator>*</FormRequiredIndicator>
    : undefined;

  const formElements = Children.map(children, child => {
    if (isValidElement(child)) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      switch ((child as any).type.displayName) {
        case 'FormLabel':
          return cloneElement(child as React.ReactElement, {
            isRequired,
            isInvalid,
            isDisabled,
            isReadOnly,
            requiredIndicator: formRequiredIndicatorElement,
            id: `${formId}-label`,
            htmlFor: formId,
          });
        case 'Input': {
          const ariaDescribedBy = [
            isInvalid ? `${formId}-feedback` : '',
            formHelpTextElement ? `${formId}-help-text` : '',
          ]
            .join(' ')
            .trim();

          return cloneElement(child as React.ReactElement, {
            isInvalid,
            isDisabled,
            isReadOnly,
            id: formId,
            'aria-describedby': ariaDescribedBy,
          });
        }
        case 'FormHelpText':
          return formHelpTextElement;
        case 'FormErrorMessage':
          return formErrorMessageElement;
        case 'FormRequiredIndicator':
          return undefined;
      }
    }
    return child;
  });

  return (
    <Box
      className={cn('relative w-full', className)}
      role="group"
      data-disabled={isDisabled}
      data-invalid={isInvalid}
      data-readonly={isReadOnly}
      {...rest}
    >
      {formElements}
    </Box>
  );
};

FormControl.displayName = 'FormControl';

export default FormControl;
