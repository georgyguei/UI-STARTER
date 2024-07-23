import { cn } from '@/lib/utils';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

type FormErrorMessageProps = object;

/**
 * Form Helper Text provides a message that shows up when an error occurs in a form section.
 *
 * @example
 * <FormErrorMessage>
 * ...
 * </FormErrorMessage>
 *
 * @param props - The props of the FormErrorMessage component.
 * @returns The FormErrorMessage component.
 */
const FormErrorMessage: UIComponent<'p', FormErrorMessageProps> = props => {
  const { className, ...rest } = props;

  return (
    <Box
      as="p"
      className={cn(
        'flex items-center text-red-500 text-sm leading-normal',
        className
      )}
      aria-live="polite"
      {...rest}
    />
  );
};

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
